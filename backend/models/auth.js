const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isVerifiedPhoneNumber: {
        type: Boolean,
        default: false
    },
    isProfileCompleted: {
        type: Boolean,
        default: false
    },
    likedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                min: 1,
                default: 1
            }
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    otp: {
        code: {
            type: String,
        },
        expiresAt: {
            type: Date,
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", authSchema);

module.exports = User;
