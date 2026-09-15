const express = require("express");
const productController = require("../controllers/product.controller");
const productRoute = express.Router();
const { body } = require("express-validator");

const productValidation = [
    body("title").notEmpty().withMessage("عنوان محصول الزامی است").isLength({ min: 3 }).withMessage("عنوان محصول باید حداقل 3 کاراکتر باشد"),
    body("description").notEmpty().withMessage("توضیحات محصول الزامی است").isLength({ min: 3 }).withMessage("توضیحات محصول باید حداقل 3 کاراکتر باشد"),
    body("price").notEmpty().withMessage("قیمت محصول الزامی است").isNumeric().withMessage("قیمت محصول باید عدد باشد"),
    body("stock").isNumeric().withMessage("موجودی محصول باید عدد باشد"),
    body("category").notEmpty().withMessage("دسته بندی محصول الزامی است"),
    body("discount").optional().isNumeric().withMessage("تخفیف محصول باید عدد باشد").isFloat({ min: 0, max: 100 }).withMessage("تخفیف محصول باید بین 0 تا 100 باشد")
];

productRoute.get("/list", productController.getProducts);

productRoute.post("/add", productValidation, productController.addProduct);

productRoute.put("/update/:id", productValidation, productController.updateProduct);

productRoute.delete("/delete/:id", productController.deleteProduct);

productRoute.post("/add-image/:id", productController.addProductImage);

module.exports = productRoute;
