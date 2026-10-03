const express = require("express");
const authenticate = require("../middleware/authenticate");
const { body } = require("express-validator");

const commentController = require("../controllers/comment.controller");

const commentRoute = express.Router();


const addCommentValidator = [
    body("text")
        .trim()
        .notEmpty()
        .withMessage("متن نظر الزامی است")
        .isLength({ min: 2, max: 1000 })
        .withMessage("متن نظر باید بین ۲ تا ۱۰۰۰ کاراکتر باشد"),
];


commentRoute.post("/add", authenticate, addCommentValidator, commentController.addComment);
commentRoute.get("/product-comment/:id", commentController.getProductComments);
commentRoute.delete("/delete/:id", authenticate, commentController.deleteComment);
commentRoute.put("/update/:id", authenticate, addCommentValidator, commentController.updateComment);

module.exports = commentRoute;
