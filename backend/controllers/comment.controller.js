const { validationResult } = require("express-validator");
const Comment = require("../models/comment");

async function addComment(req, res) {
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg })
        }


        const userId = req.user.userId;
        const productId = req.body.productId;
        const text = req.body.text;
        const parentId = req.body.parentId;

        if (parentId) {
            const parentComment = await Comment.findOne({
                _id: parentId,
                product: productId,
                parent: null,
            });

            if (!parentComment) {
                return res.status(404).json({
                    message: "کامنت والد پیدا نشد",
                });
            }
        }

        const newComment = new Comment({
            user: userId,
            product: productId,
            text: text,
            parent: parentId || null
        })
        await newComment.save();
        return res.status(201).json({ message: parentId ? "پاسخ با موفقیت ثبت شد" : "نظر با موفقیت ثبت شد" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "خطایی در سمت سرور رخ داده است" })
    }
}

async function getProductComments(req, res) {
    try {
        const productId = req.params.id;

        const comments = await Comment.find({
            product: productId,
        })
            .populate("user")
            .sort({ createdAt: -1 });

        return res.status(200).json(comments);

    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "خطایی در سمت سرور رخ داده است" })
    }
}

async function deleteComment(req, res) {
    try {
        const commentId = req.params.id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "نظر یافت نشد",
            });
        }

        if (comment.user.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "شما اجازه حذف این نظر را ندارید",
            });
        }

        await Comment.deleteOne({ _id: commentId });

        await Comment.deleteMany({
            parent: commentId,
        });

        return res.status(200).json({
            message: "نظر با موفقیت حذف شد",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "خطایی از سمت سرور رخ داده است",
        });
    }
}

async function updateComment(req, res) {
    try {
        
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg })
        }


        const commentId = req.params.id;
        const text = req.body.text;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                message: "نظر یافت نشد",
            });
        }

        if (comment.user.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "شما اجازه ویرایش این نظر را ندارید",
            });
        }

        comment.text = text;
        await comment.save();

        return res.status(200).json({
            message: "نظر با موفقیت ویرایش شد",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "خطایی از سمت سرور رخ داده است",
        });
    }
}

module.exports = {
    addComment,
    getProductComments,
    deleteComment,
    updateComment
}