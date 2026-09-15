const Product = require("../models/product");
const Category = require("../models/category");

const { validationResult } = require("express-validator");

async function addProduct(req, res) {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg })
        }

        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const stock = req.body.stock;
        const category = req.body.category;
        const discount = req.body.discount;

        const product = new Product({
            title,
            description,
            price,
            stock,
            discount,
            category
        })

        const savedProduct = await product.save();
        if (savedProduct) {
            return res.status(201).json({ message: "محصول با موفقیت ایجاد شد", product: savedProduct });
        } else {
            return res.status(500).json({ error: "خطایی در ایجاد محصول رخ داده است" });
        }

    } catch (error) {
        return res.status(500).json({ error: "خطایی در سمت سرور رخ داده است" })
    }
}

async function updateProduct(req, res) {
    try {

        const productId = req.params.id;

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg })
        }

        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const stock = req.body.stock;
        const category = req.body.category;
        const discount = req.body.discount;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "محصول یافت نشد" });
        }
        product.title = title;
        product.description = description;
        product.price = price;
        product.stock = stock;
        product.category = category;
        product.discount = discount;

        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res.status(200).json({ message: "محصول با موفقیت به روز رسانی شد", product: updatedProduct });
        } else {
            return res.status(500).json({ error: "خطایی در به روز رسانی محصول رخ داده است" });
        }

    } catch (error) {
        return res.status(500).json({ error: "خطایی در سمت سرور رخ داده است" })
    }
}

async function getProducts(req, res) {
    try {
        const { category, minPrice, maxPrice, search, page, limit, sort } = req.query;

        const filter = {};

        const sortProducts = sort == "latest" ? { createdAt: -1 } : sort == "earliest" ? { createdAt: 1 } : { createdAt: -1 }


        if (category) {
            const categoryExists = await Category.findOne({ englishTitle: category });
            if (!categoryExists) {
                return res.status(200).json({
                    products: [],
                    currentPage: 1,
                    totalPages: 0,
                    totalProducts: 0
                });
            }
            filter.category = categoryExists._id;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        const pageNumber = Number(page) || 1;
        const pageLimit = Number(limit) || 10;
        const skip = (pageNumber - 1) * pageLimit;

        const products = await Product.find(filter)
            .populate("category")
            .skip(skip)
            .limit(pageLimit)
            .sort(sortProducts);

        const totalProducts = await Product.countDocuments(filter);

        return res.status(200).json({
            products,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalProducts / pageLimit),
            totalProducts
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "خطایی در سمت سرور رخ داده است" });
    }
}

async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "محصول یافت نشد" });
        }

        return res.status(200).json({ message: "محصول با موفقیت حذف شد", product: deletedProduct });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "خطایی در سمت سرور رخ داده است" });
    }
}

async function addProductImage(req, res) {
    try {
        const productId = req.params.id;
        const image = req.file;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: "محصول یافت نشد" });
        }

        if (image) {
            product.image.push(image.filename);
            const updatedProduct = await product.save();
            return res.status(200).json({ message: "تصویر محصول با موفقیت اضافه شد", product: updatedProduct });
        } else {
            return res.status(400).json({ error: "تصویری برای اضافه کردن ارسال نشده است" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "خطایی در سمت سرور رخ داده است" });
    }
}

module.exports = {
    addProduct,
    updateProduct,
    getProducts,
    deleteProduct,
    addProductImage
}