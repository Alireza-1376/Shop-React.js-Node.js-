const express = require("express");
const { body } = require("express-validator");
const orderController = require("../controllers/order.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const orderRoute = express.Router();

const adressValidator = [
    body("address")
        .trim()
        .notEmpty()
        .withMessage("آدرس الزامی است")
        .isLength({ min: 2, max: 1000 })
        .withMessage("آدرس باید بین ۲ تا ۱۰۰۰ کاراکتر باشد"),
];



orderRoute.post("/checkout", authenticate, adressValidator, orderController.checkout)

orderRoute.get("/payment/callback", orderController.paymentCallback)

orderRoute.get("/users-orders-list", authenticate, orderController.userOrders)

orderRoute.get("/admin-orders-list", authenticate, authorize, orderController.adminOrders)

orderRoute.put("/change-status/:id", authenticate, authorize, orderController.changeStatus)

module.exports = orderRoute;