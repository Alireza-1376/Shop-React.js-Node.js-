const express = require("express");
const cartController = require("../controllers/cart.controller");
const authenticate = require("../middleware/authenticate");
const cartRoute = express.Router();

cartRoute.post("/add/:id", authenticate, cartController.addToCart);
cartRoute.post("/merge", authenticate, cartController.mergeCart)

module.exports = cartRoute;

