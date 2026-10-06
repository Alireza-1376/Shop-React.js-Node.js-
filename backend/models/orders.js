const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },

            name: {
                type: String,
                required: true
            },

            price: {
                type: Number,
                required: true
            },
            discount: {
                type: Number,
                default: 0
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    address: {
        type: String,
        required: true,
        trim: true
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["pending", "paid", "failed", "cancelled"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending"
    },
    authority: {
        type: String,
        default: null
    },
    transactionId: {
        type: String,
        default: null
    },
    stockRestored: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000)
    }
},
    {
        timestamps: true
    }
)

const Order = mongoose.model("Order", orderSchema)


module.exports = Order;
