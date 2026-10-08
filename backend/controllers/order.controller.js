const { validationResult } = require("express-validator");
const User = require("../models/auth");
const Order = require("../models/orders");
const Product = require("../models/product")
const zarinpal = require("../config/zarinpal");

async function restoreStock(order) {

    if (order.stockRestored) {
        return;
    }

    for (const item of order.items) {
        await Product.findByIdAndUpdate(
            item.product,
            {
                $inc: {
                    stock: item.quantity
                }
            }
        );
    }

    order.stockRestored = true;

    await order.save();
}

async function checkExpiredOrders() {
    const orders = await Order.find({
        paymentStatus: "pending",
        status: "pending",
        stockRestored: false,
        expiresAt: { $lte: new Date() }
    });

    for (const order of orders) {
        await restoreStock(order);

        order.paymentStatus = "failed";

        await order.save();
    }
}

async function checkout(req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg
            });
        }

        const userId = req.user.userId;
        const address = req.body.address;

        const user = await User.findById(userId).populate("cart.product");

        if (!user) {
            return res.status(404).json({
                message: "کاربر پیدا نشد"
            });
        }

        if (!user.cart || user.cart.length === 0) {
            return res.status(400).json({
                message: "سبد خرید خالی است"
            });
        }

        // 2. کم کردن موجودی
        for (const item of user.cart) {
            const product = await Product.findOneAndUpdate(
                {
                    _id: item.product._id,
                    stock: { $gte: item.quantity }
                },
                {
                    $inc: {
                        stock: -item.quantity
                    }
                },
                {
                    returnDocument: "after"
                }

            );

            if (!product) {
                return res.status(400).json({
                    message: `موجودی ${item.product.title} کافی نیست`
                });
            }
        }


        // 3. ساخت آیتم‌های سفارش
        const items = user.cart.map((item) => ({
            product: item.product._id,
            name: item.product.title,
            price: item.product.price,
            discount: item.product.discount || 0,
            quantity: item.quantity
        }));

        // 4. محاسبه قیمت
        const totalPrice = items.reduce((total, item) => {
            const discountAmount = (item.price * item.discount) / 100;
            const finalPrice = item.price - discountAmount;
            return total + finalPrice * item.quantity;
        }, 0);

        // 5. ساخت Order
        const order = await Order.create({
            user: userId,
            items,
            address,
            totalPrice
        });

        // 6. درخواست پرداخت
        const payment = await zarinpal.payments.create({
            amount: order.totalPrice,
            description: `پرداخت سفارش ${order._id}`,
            callback_url: `${process.env.BACKEND_URL}/api/order/payment/callback`,
        });

        // 7. گرفتن Authority
        const authority = payment.data.authority;

        order.authority = authority;

        await order.save();

        // 8. ساخت لینک پرداخت
        const paymentUrl = zarinpal.payments.getRedirectUrl(authority);

        return res.status(200).json({
            paymentUrl,
            orderId: order._id,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "خطایی در سرور رخ داد"
        });
    }
}

async function paymentCallback(req, res) {
    try {
        const { Authority, Status } = req.query;

        const order = await Order.findOne({
            authority: Authority
        });

        if (!order) {
            return res.redirect(
                `${process.env.FRONTEND_URL}/?payment=not-found`
            );
        }

        if (order.paymentStatus === "paid") {
            return res.redirect(
                `${process.env.FRONTEND_URL}/not-found`
            );
        }

        if (Status !== "OK") {
            order.paymentStatus = "failed";
            await restoreStock(order);
            return res.redirect(
                `${process.env.FRONTEND_URL}/?payment=failed`
            );
        }

        const verify = await zarinpal.verifications.verify({
            amount: order.totalPrice,
            authority: Authority
        });


        if (verify.data.code === 100 || verify.data.code === 101) {

            order.paymentStatus = "paid";

            if (verify.data.ref_id) {
                order.transactionId =
                    verify.data.ref_id.toString();
            }

            await order.save();

            await User.findByIdAndUpdate(order.user, {
                $set: {
                    cart: []
                }
            });

            return res.redirect(
                `${process.env.FRONTEND_URL}/?payment=success`
            );
        }

        order.paymentStatus = "failed";

        await restoreStock(order);

        return res.redirect(
            `${process.env.FRONTEND_URL}/?payment=failed`
        );

    } catch (error) {
        console.error("Payment callback error:", error);
        return res.redirect(
            `${process.env.FRONTEND_URL}/?payment=error`
        );
    }
}

async function userOrders(req, res) {
    try {
        const userId = req.user.userId;
        const orders = await Order.find({ user: userId })

        if (!orders) {
            return res.status(404).json({
                message: "سفارش یافت نشد"
            });
        }

        return res.status(200).json(orders)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "خطایی در سرور رخ داد"
        });
    }
}

async function adminOrders(req, res) {
    try {
        const { page, limit } = req.query;
        const pageNumber = Number(page) || 1;
        const pageLimit = Number(limit) || 10;
        const skip = (pageNumber - 1) * pageLimit;

        const orders = await Order.find().skip(skip).limit(pageLimit).populate("user").sort({ createdAt: -1 });
        if (!orders) {
            return res.status(404).json({
                message: "سفارش یافت نشد"
            });
        }

        return res.status(200).json(orders)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "خطایی در سرور رخ داد"
        });
    }
}

module.exports = {
    checkout,
    paymentCallback,
    checkExpiredOrders,
    userOrders,
    adminOrders
}