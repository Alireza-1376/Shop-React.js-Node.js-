const User = require("../models/auth")
const Product = require("../models/product")

async function addToCart(req, res) {
    try {
        const userId = req.user.userId;
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "محصول پیدا نشد" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "کاربر پیدا نشد" });
        }

        const cartItem = user.cart.find((item) => {
            return item.product.toString() === productId;
        });

        if (cartItem) {
            if (product.stock <= cartItem.quantity) {
                return res.status(400).json({ message: "موجودی کافی نیست" });
            }
        }

        if (!cartItem) {
            user.cart.push({
                product: productId,
                quantity: 1
            });
        } else {
            cartItem.quantity += 1;
        }

        await user.save();
        return res.status(200).json({
            message: "محصول به سبد خرید اضافه شد",
            cart: user.cart
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "خطایی در سرور رخ داد"
        });
    }

}

async function mergeCart(req, res) {
    try {
        const userId = req.user.userId;
        const localCart = req.body.cart;
        if (!localCart) {
            return res.status(400).json({ message: "سبد خرید نامعتبر است" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "کاربر پیدا نشد" });
        }

        if (user.cart.length == 0) {
            for (const item of localCart) {
                const product = await Product.findById(item.product);
                if (!product) continue;
                if (product.stock >= item.quantity) {
                    user.cart.push(item);
                } else {
                    user.cart.push({
                        product: item.product,
                        quantity: product.stock
                    });
                }
            }
        } else {
            for (const localItem of localCart) {
                const product = await Product.findById(localItem.product);
                if (!product) continue;

                const find = user.cart.find((cartItem) => {
                    return cartItem.product == localItem.product;
                })
                if (find) {
                    if (product.stock >= (find.quantity + localItem.quantity)) {
                        find.quantity = find.quantity + localItem.quantity;
                    } else {
                        find.quantity = product.stock
                        product.stock = 0;
                    }
                } else {
                    user.cart.push({
                        product: localItem.product,
                        quantity: Math.min(localItem.quantity, product.stock)
                    });
                }

            }
        }


        await user.save();

        return res.status(200).json({
            message: "سبد خرید با موفقیت ترکیب شد",
            cart: user.cart
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "خطایی در سرور رخ داد" });
    }
}

module.exports = {
    addToCart,
    mergeCart
}