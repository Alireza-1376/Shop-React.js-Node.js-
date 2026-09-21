const express = require("express");
const authController = require("../controllers/auth.controller");
const authRoute = express.Router();
const { body } = require("express-validator");
const authenticate = require("../middleware/authenticate");

const mobileValidation = body("mobile")
    .trim()
    .notEmpty()
    .withMessage("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/)
    .withMessage("شماره موبایل معتبر نیست");


authRoute.post("/register", mobileValidation, authController.register);

authRoute.post(
    "/verify-otp",
    [
        mobileValidation,
        body("otp")
            .trim()
            .isLength({ min: 6, max: 6 })
            .isNumeric()
            .withMessage("کد تایید باید 6 رقم باشد")
    ],
    authController.verifyOtp
);

authRoute.post(
    "/complete-profile",
    authenticate,
    body("username")
        .trim()
        .notEmpty()
        .withMessage("نام کاربری الزامی است")
        .isLength({ min: 3, max: 50 })
        .withMessage("نام کاربری باید بین 3 تا 50 کاراکتر باشد"),
    body("email")
        .trim()
        .isEmail()
        .withMessage("ایمیل معتبر نیست"),
    authController.completeProfile
);

authRoute.post("/refresh", authController.refreshToken);

authRoute.delete("/logout", authController.logout);

authRoute.get("/user", authenticate, authController.getUser)

module.exports = authRoute;