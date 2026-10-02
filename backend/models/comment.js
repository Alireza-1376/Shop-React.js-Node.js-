const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 1000,
    },

    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
    },
},
    {
        timestamps: true,
    }
)

const Comment = mongoose.model("Comment", commentSchema)


module.exports = Comment;