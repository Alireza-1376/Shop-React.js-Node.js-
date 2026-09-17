const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    try {

        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({
                message: "لطفا وارد شوید"
            });
        }

        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error("ACCESS_TOKEN_SECRET must be defined");
        }

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "توکن نامعتبر یا منقضی شده است"
        });
    }
}

module.exports = authenticate;