const Product = require("../models/product");
const Category = require("../models/category");
const fs = require("fs/promises");
const path = require("path");

const { validationResult } = require("express-validator");
const User = require("../models/auth");

async function addProduct(req, res) {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg })
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
            return res.status(500).json({ message: "خطایی در ایجاد محصول رخ داده است" });
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
        const pageLimit = Number(limit) || 6;
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

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "محصول یافت نشد" })
        }
        await Promise.all(
            product.image.map(async (img) => {
                const imagePath = path.join(__dirname, "..", "images", img);

                try {
                    await fs.unlink(imagePath);
                } catch (error) {
                    console.log(error)
                }
            })
        );

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

async function getSingleProduct(req, res) {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate("category");

        if (!product) {
            return res.status(404).json({ message: "محصول یافت نشد" })
        }

        return res.status(200).json({ product })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "خطایی در سمت سرور رخ داده است" })
    }

}

async function deleteImage(req, res) {
    try {
        const id = req.params.id;
        const imageName = req.body.imageName;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "محصول یافت نشد" })
        }

        const imagePath = path.join(__dirname, "..", "images", imageName);
        fs.unlink(imagePath, (error) => {
            if (error) {
                console.log(error);
                return;
            }
        });
        const filteredImages = product.image.filter((img) => {
            return img != imageName
        })
        product.image = filteredImages;
        await product.save()

        return res.status(200).json({ message: "عکس محصول با موفقیت حذف شد" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "خطایی در سمت سرور رخ داده است" })
    }

}

async function likeProduct(req, res) {
    try {
        const userId = req.user.userId;
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "محصول مورد نظر پیدا نشد",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "کاربر پیدا نشد"
            });
        }

        const findLike = product.likes.find((like) => {
            return like.toString() == userId.toString();
        })

        if (findLike) {
            const filterProductLike = product.likes.filter(like => like != userId)
            const filterUserLike = user.likedProducts.filter(like => like != productId)
            product.likes = filterProductLike;
            user.likedProducts = filterUserLike;
            await product.save();
            await user.save();
            return res.status(200).json({
                message: "لایک محصول حذف شد",
                liked: false,
            });
        } else {
            product.likes.push(userId);
            user.likedProducts.push(productId);
            await product.save();
            await user.save();
            return res.status(200).json({
                message: "محصول با موفقیت لایک شد",
                liked: true,
            });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "خطایی در لایک محصول رخ داد" });
    }
}

module.exports = {
    addProduct,
    updateProduct,
    getProducts,
    deleteProduct,
    addProductImage,
    getSingleProduct,
    deleteImage,
    likeProduct
}