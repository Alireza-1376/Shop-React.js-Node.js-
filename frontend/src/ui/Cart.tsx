import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiMinus, FiPlus, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import toPersianPrice from "../utils/toPersianPrice";
import toPersianNumber from "../utils/toPersianNumber";
import { useAddToCart } from "../components/products/useAddToCart";
import type { ProductType } from "../types/product";
import { useDeleteFromCart } from "../components/products/useDeleteFromCart";
import { useUser } from "../hooks/useUser";
import { useDeleteCartItems } from "../components/products/useDeleteCartItems";

function Cart() {
    const { user } = useUser();
    const { cart: localCart, addToLocalCart, decreaseFromLocalCart, removeFromLocalCart } = useContext(CartContext);
    const { add } = useAddToCart();
    const { deleteFromCart } = useDeleteFromCart();
    const { deleteCartItems } = useDeleteCartItems();
    const navigate = useNavigate();

    const cart = user ? user.cart : localCart;

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    const totalPrice = cart.reduce((total, item) => {
        const price = item.product.price;
        const discount = item.product.discount || 0;
        const finalPrice = price - (price * discount) / 100;

        return total + finalPrice * item.quantity;
    }, 0);

    async function handleAddToCart(product: ProductType) {
        if (!user) {
            addToLocalCart(product)
            return;
        }
        await add(product._id)
    }

    async function handleDeleteFromCart(product: ProductType) {
        if (!user) {
            decreaseFromLocalCart(product)
            return;
        }
        await deleteFromCart(product._id)
    }

    async function handleDeleteCartItems(product: ProductType) {
        if (!user) {
            removeFromLocalCart(product)
            return;
        }
        await deleteCartItems(product._id)
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 sm:text-3xl">
                            سبد خرید
                        </h1>

                        <p className="mt-2 text-sm text-slate-400">
                            محصولات انتخاب‌شده شما
                        </p>
                    </div>

                    <Link
                        to="/products"
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition-all hover:border-emerald-200 hover:text-emerald-600"
                    >
                        <FiArrowRight size={17} />
                        ادامه خرید
                    </Link>
                </div>

                {cart.length === 0 ? (
                    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                            <FiShoppingCart size={28} />
                        </div>

                        <h2 className="mt-5 text-lg font-black text-slate-700">
                            سبد خرید شما خالی است
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">
                            هنوز محصولی به سبد خرید اضافه نکرده‌اید
                        </p>

                        <Link
                            to="/products"
                            className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-600"
                        >
                            مشاهده محصولات
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">

                        <div className="space-y-4">
                            {cart.map((item) => {
                                const product = item.product;
                                const finalPrice = product.price - (product.price * (product.discount || 0)) / 100;

                                return (
                                    <div
                                        key={product._id}
                                        className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                                    >
                                        <div className="flex items-center gap-4">

                                            <img
                                                src={`http://localhost:5000/${product.image[0]}`}
                                                alt={product.title}
                                                className="h-24 w-24 rounded-xl object-cover"
                                            />

                                            <div className="min-w-0 flex-1">
                                                <h2 className="truncate text-base font-black text-slate-800">
                                                    {product.title}
                                                </h2>

                                                <p className="mt-2 text-sm text-slate-400">
                                                    {toPersianPrice(finalPrice)}
                                                </p>

                                                <div className="mt-4 flex items-center gap-3">
                                                    <button
                                                        onClick={() => { handleDeleteFromCart(item.product) }}
                                                        type="button"
                                                        className="flex cursor-pointer h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                                                    >
                                                        <FiMinus size={16} />
                                                    </button>

                                                    <span className="min-w-8 text-center text-sm font-black text-slate-700">
                                                        {toPersianNumber(item.quantity)}
                                                    </span>

                                                    <button
                                                        onClick={() => { handleAddToCart(item.product) }}
                                                        type="button"
                                                        className="flex cursor-pointer h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                                                    >
                                                        <FiPlus size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-4">
                                                <button
                                                    onClick={() => { handleDeleteCartItems(item.product) }}
                                                    type="button"
                                                    className="flex cursor-pointer h-9 w-9 items-center justify-center rounded-lg text-red-400 transition-all hover:bg-red-50 hover:text-red-500"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>

                                                <span className="text-base font-black text-slate-800">
                                                    {toPersianPrice(
                                                        finalPrice * item.quantity
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="h-fit rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-black text-slate-800">
                                خلاصه سفارش
                            </h2>

                            <div className="mt-5 flex items-center justify-between border-b border-slate-100 pb-4 text-sm">
                                <span className="text-slate-400">
                                    تعداد محصولات
                                </span>

                                <span className="font-bold text-slate-700">
                                    {toPersianNumber(
                                        cart.reduce(
                                            (total, item) => total + item.quantity,
                                            0
                                        )
                                    )}
                                </span>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="font-bold text-slate-600">
                                    مبلغ قابل پرداخت
                                </span>

                                <span className="text-lg font-black text-emerald-600">
                                    {toPersianPrice(totalPrice)}
                                </span>
                            </div>

                            <button
                                onClick={() => {
                                    if (user) {
                                        navigate("/checkout")
                                    } else {
                                        navigate("/login")
                                    }
                                }}
                                type="button"
                                className="mt-6 cursor-pointer w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-black text-white transition-all hover:bg-emerald-600"
                            >
                                ادامه و پرداخت
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
