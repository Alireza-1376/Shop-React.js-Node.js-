const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/auth");

const OTP_EXPIRES_IN_MINUTES = 2;
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || "1h";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "24h";

function createTokens(user) {
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
        throw new Error("ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET must be defined");
    }
    const payload = {
        userId: user._id.toString(),
        role: user.role
    };

    return {
        accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN
        }),
        refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRES_IN
        })
    };
}

function createAccessToken(user) {
    return jwt.sign(
        {
            userId: user._id.toString(),
            role: user.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN
        }
    );
}

function setAuthCookies(res, tokens) {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    };

    res.cookie("accessToken", tokens.accessToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 1000
    });
    res.cookie("refreshToken", tokens.refreshToken, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000,
        path: "/api"
    });
}

function generateOtp() {
    return crypto.randomInt(100000, 1000000).toString();
}

async function sendOtp(mobile, otp) {
    // Replace this with the SMS provider API before deploying to production.
    console.log(`OTP for ${mobile}: ${otp}`);
}

async function register(req, res) {
    try {
        const mobile = req.body.mobile;
        const otp = generateOtp();
        const expiresAt = new Date(Date.now() + OTP_EXPIRES_IN_MINUTES * 60 * 1000);
        let user = await User.findOne({ mobile });

        if (user && user.otp?.expiresAt && new Date(user.otp.expiresAt) > new Date()) {
            return res.status(400).json({
                error: "کد تایید قبلا برای شما ارسال شده است"
            });
        }

        if (!user) {
            user = new User({
                mobile: mobile,
                otp: {
                    code: otp,
                    expiresAt: expiresAt
                }
            });
        } else {
            user.otp.code = otp;
            user.otp.expiresAt = expiresAt;
        }

        await user.save();

        await sendOtp(mobile, otp);
        return res.status(200).json({
            message: `کد تایید به شماره موبایل ${mobile} ارسال شد`,
            expiresIn: expiresAt
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "ارسال کد تایید انجام نشد" });
    }
}

async function verifyOtp(req, res) {
    try {
        const mobile = req.body.mobile;
        const otp = req.body.otp;
        const user = await User.findOne({ mobile })

        if (!user || !user.otp?.code || !user.otp?.expiresAt) {
            return res.status(400).json({ message: "کد تایید یافت نشد" });
        }

        if (new Date(user.otp.expiresAt) < new Date()) {
            return res.status(400).json({ message: "کد تایید منقضی شده است" });
        }

        const isValid = otp === user.otp.code;
        if (!isValid) {
            return res.status(400).json({ message: "کد تایید نادرست است" });
        }

        user.isVerified = true;
        user.otp=undefined ;
        await user.save();

        const tokens = createTokens(user);
        setAuthCookies(res, tokens);

        return res.status(200).json({
            message: "شماره موبایل با موفقیت تایید شد",
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "تایید کد انجام نشد" });
    }
}

async function completeProfile(req, res) {
    try {
        const userId = req.user.userId;
        const { username, email } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "کاربر پیدا نشد"
            });
        }

        user.username = username;
        user.email = email;

        await user.save();

        return res.status(200).json({
            message: "اطلاعات کاربر با موفقیت ثبت شد",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ثبت اطلاعات کاربر انجام نشد" });
    }
}

async function refreshToken(req, res) {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token یافت نشد"
            });
        }

        let decoded;

        try {
            decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );
        } catch (error) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken", {
                path: "/api"
            });
            return res.status(401).json({
                message: "نشست شما منقضی شده است. لطفاً دوباره وارد شوید."
            });
        }

        const user = await User.findById(decoded.userId);

        if (!user) {
            res.clearCookie("accessToken");

            res.clearCookie("refreshToken", {
                path: "/api"
            });
            return res.status(401).json({
                message: "کاربر پیدا نشد. لطفاً دوباره وارد شوید."
            });

        }

        const newAccessToken = createAccessToken(user);

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Access token با موفقیت ایجاد شد"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "تجدید توکن انجام نشد"
        });
    }
}

async function logout(req, res) {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken", {
            path: "/api"
        });
        return res.status(200).json({
            message: "با موفقیت از حساب کاربری خارج شدید"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "خروج از حساب کاربری انجام نشد"
        });
    }
}




module.exports = {
    register,
    verifyOtp,
    completeProfile,
    refreshToken,
    logout
};