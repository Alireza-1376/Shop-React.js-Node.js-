import {
    FiCalendar,
    FiPackage,
    FiMapPin,
    FiHash,
} from "react-icons/fi";

import { useGetOrder } from "./useGetOrders";
import Loading from "../../ui/Loading";

function OrdersList() {
    const { isLoading, orders } = useGetOrder();
    
    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center text-emerald-500">
                <Loading size={60} />
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <main
                dir="rtl"
                className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8"
            >
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <FiPackage className="text-3xl" />
                    </div>

                    <h1 className="mt-5 text-xl font-black text-slate-800">
                        هنوز سفارشی ثبت نکرده‌اید
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        سفارش‌های شما بعد از خرید در این قسمت نمایش داده می‌شوند.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main
            dir="rtl"
            className="min-h-screen bg-gray-50 px-4 py-8 pt-28 sm:px-6"
        >
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-slate-800 sm:text-3xl">
                        سفارش‌های من
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        لیست سفارش‌های ثبت‌شده شما
                    </p>
                </div>

                {/* Orders */}
                <div className="space-y-5">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                        >
                            {/* Header */}
                            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <FiPackage className="text-xl" />
                                    </div>

                                    <div>
                                        <p className="font-bold text-slate-800">
                                            سفارش
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            {order._id}
                                        </p>
                                    </div>
                                </div>

                                {/* Status */}
                                <span
                                    className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${order.paymentStatus === "paid"
                                            ? "bg-emerald-50 text-emerald-600"
                                            : order.paymentStatus === "pending"
                                                ? "bg-amber-50 text-amber-600"
                                                : "bg-red-50 text-red-600"
                                        }`}
                                >
                                    {order.paymentStatus === "paid"
                                        ? "پرداخت شده"
                                        : order.paymentStatus === "pending"
                                            ? "در انتظار پرداخت"
                                            : order.paymentStatus === "failed"
                                                ? "ناموفق"
                                                : "لغو شده"}
                                </span>
                            </div>

                            {/* Products */}
                            <div className="p-5">
                                <h2 className="mb-4 text-sm font-bold text-slate-700">
                                    محصولات سفارش
                                </h2>

                                <div className="space-y-3">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.product._id}
                                            className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-bold text-slate-700">
                                                    {item.name}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    تعداد: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="shrink-0 text-sm font-bold text-slate-700">
                                                {item.price.toLocaleString("fa-IR")} تومان
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Information */}
                            <div className="grid grid-cols-1 gap-5 border-t border-slate-100 p-5 sm:grid-cols-3">

                                {/* Date */}
                                <div className="flex items-start gap-3">
                                    <FiCalendar className="mt-0.5 shrink-0 text-lg text-slate-400" />

                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400">
                                            تاریخ ثبت سفارش
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-slate-700">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString("fa-IR")}
                                        </p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-3">
                                    <FiMapPin className="mt-0.5 shrink-0 text-lg text-slate-400" />

                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400">
                                            آدرس
                                        </p>

                                        <p className="mt-1 wrap-break-word text-sm font-bold text-slate-700">
                                            {order.address}
                                        </p>
                                    </div>
                                </div>

                                {/* Transaction ID */}
                                <div className="flex items-start gap-3">
                                    <FiHash className="mt-0.5 shrink-0 text-lg text-slate-400" />

                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400">
                                            کد پیگیری
                                        </p>

                                        <p className="mt-1 break-all text-sm font-bold text-slate-700">
                                            {order.transactionId ?? "ثبت نشده"}
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                                <span className="text-sm text-slate-500">
                                    مبلغ کل سفارش
                                </span>

                                <span className="text-lg font-black text-emerald-600">
                                    {order.totalPrice.toLocaleString("fa-IR")} تومان
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default OrdersList;