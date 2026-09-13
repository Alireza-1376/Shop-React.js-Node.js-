const { validationResult } = require("express-validator");
const Category = require("../models/category")

async function addCategory(req, res) {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ error: result.errors[0].msg });
        }

        const title = req.body.title;
        const englishTitle = req.body.englishTitle;
        const description = req.body.description;

        const category = new Category({
            title,
            englishTitle,
            description
        })

        const savedCategory = await category.save();

        if (savedCategory) {
            return res.status(201).json({ message: "دسته بندی با موفقیت ایجاد شد", category: savedCategory });
        }


    } catch (error) {
        return res.status(500).json({ error: "خطایی در سمت سرور رخ داده است" })
    }
}

async function getAllCategories(req, res) {
    try {
        const categories = await Category.find();
        if (categories) {
            return res.status(200).json({ categories });
        } else {
            return res.status(404).json({ error: "دسته بندی یافت نشد" });
        }

    } catch (error) {
        return res.status(500).json({ error: "خطایی در سمت سرور رخ داده است" })
    }
}

async function deleteCategory(req, res) {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (deletedCategory) {
            return res.status(200).json({ message: "دسته بندی با موفقیت حذف شد" });
        } else {
            return res.status(404).json({ error: "دسته بندی یافت نشد" });
        }

    } catch (error) {
        return res.status(500).json({ error: "خطایی در سمت سرور رخ داده است" })
    }
}

async function updateCategory(req, res) {
    try {
        const categoryId = req.params.id;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ error: result.errors[0].msg });
        }

        const title = req.body.title;
        const englishTitle = req.body.englishTitle;
        const description = req.body.description;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: "دسته بندی یافت نشد" });
        }

        category.title = title;
        category.englishTitle = englishTitle;
        category.description = description;

        const savedChanges = await category.save();

        if (savedChanges) {
            return res.status(201).json({ message: "دسته بندی با موفقیت ویرایش شد", category: savedChanges });
        }

    } catch (error) {
        return res.status(500).json({ error: "خطایی در سمت سرور رخ داده است" })
    }
}



module.exports = {
    addCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
};