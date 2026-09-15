const express = require("express");
const categoryController = require("../controllers/category.controller");
const categoryRoute = express.Router();
const { body } = require("express-validator");

const categoryValidation = [
    body("title").trim().notEmpty().withMessage("لطفا عنوان دسته بندی را وارد کنید").isLength({ min: 3 }).withMessage("عنوان دسته بندی باید حداقل 3 کاراکتر باشد"),
    body("englishTitle").trim().notEmpty().withMessage("لطفا عنوان انگلیسی دسته بندی را وارد کنید").isLength({ min: 3 }).withMessage("عنوان انگلیسی دسته بندی باید حداقل 3 کاراکتر باشد"),
    body("description").trim().optional()
];

categoryRoute.post("/add", categoryValidation, categoryController.addCategory);

categoryRoute.get("/list", categoryController.getAllCategories)

categoryRoute.delete("/delete/:id", categoryController.deleteCategory)

categoryRoute.put("/update/:id", categoryValidation, categoryController.updateCategory)

module.exports = categoryRoute;