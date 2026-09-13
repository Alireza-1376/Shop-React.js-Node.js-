const express = require("express");
const categoryController = require("../controllers/category.controller");
const categoryRoute = express.Router();
const { body } = require("express-validator");

categoryRoute.post("/add", [
    body("title").trim().notEmpty().withMessage("لطفا عنوان دسته بندی را وارد کنید").isLength({ min: 3 }).withMessage("عنوان دسته بندی باید حداقل 3 کاراکتر باشد"),
    body("englishTitle").trim().notEmpty().withMessage("لطفا عنوان انگلیسی دسته بندی را وارد کنید").isLength({ min: 3 }).withMessage("عنوان انگلیسی دسته بندی باید حداقل 3 کاراکتر باشد"),
    body("description").trim().optional()
], categoryController.addCategory);

categoryRoute.get("/list", categoryController.getAllCategories)

categoryRoute.delete("/delete/:id", categoryController.deleteCategory)

categoryRoute.put("/update/:id", [
    body("title").trim().notEmpty().withMessage("لطفا عنوان دسته بندی را وارد کنید").isLength({ min: 3 }).withMessage("عنوان دسته بندی باید حداقل 3 کاراکتر باشد"),
    body("englishTitle").trim().notEmpty().withMessage("لطفا عنوان انگلیسی دسته بندی را وارد کنید").isLength({ min: 3 }).withMessage("عنوان انگلیسی دسته بندی باید حداقل 3 کاراکتر باشد"),
    body("description").trim().optional()
], categoryController.updateCategory)

module.exports = categoryRoute;