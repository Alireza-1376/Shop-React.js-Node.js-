const express = require("express");
const authController = require("../controllers/auth.controller");
const authRoute = express.Router();
const { body, validationResult } = require("express-validator");
const authenticate = require("../middleware/auth");

const mobileValidation = body("mobile")
    .trim()
    .notEmpty()
    .withMessage("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/)
    .withMessage("شماره موبایل معتبر نیست");

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
}

authRoute.post("/register", mobileValidation, handleValidationErrors, authController.register);

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
    handleValidationErrors,
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
    handleValidationErrors,
    authController.completeProfile
);

authRoute.post("/refresh", authController.refreshToken);

authRoute.delete("/logout", authController.logout);

module.exports = authRoute;