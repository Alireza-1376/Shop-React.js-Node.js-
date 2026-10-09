import type { Order } from "../../../types/order";
import toLocalDateShort from "../../../utils/toLocalDateShort";
import toPersianNumber from "../../../utils/toPersianNumber";
import toPersianPrice from "../../../utils/toPersianPrice";

const PaymentStatus = {
    pending: {
        title: "در انتظار پرداخت",
        class: "bg-amber-50 text-amber-700",
    },
    paid: {
        title: "پرداخت شده",
        class: "bg-emerald-50 text-emerald-700",
    },
    failed: {
        title: "پرداخت ناموفق",
        class: "bg-rose-50 text-rose-700",
    },
    refunded: {
        title: "مبلغ برگشت داده شده",
        class: "bg-orange-50 text-orange-700",
    },
};

const OrderStatus = {
    pending: {
        title: "در حال آماده‌سازی",
        class: "bg-slate-100 text-slate-600",
    },
    shipped: {
        title: "ارسال شده",
        class: "bg-sky-50 text-sky-700",
    },
    delivered: {
        title: "تحویل داده شده",
        class: "bg-emerald-50 text-emerald-700",
    },
};

function OrderDetail({ order }: { order: Order }) {
    return (
        <div dir="rtl" className="space-y-6 bg-white text-slate-700">
            {/* اطلاعات سفارش */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Info label="شماره سفارش" value={order._id} />

                <Info
                    label="نام مشتری"
                    value={order.user?.username || "نامشخص"}
                />

                <Info
                    label="شماره موبایل"
                    value={toPersianNumber(String(order.user?.mobile)) || "ثبت نشده"}
                />

                <Info
                    label="تاریخ سفارش"
                    value={toLocalDateShort(order.createdAt)}
                />

                <Info
                    label="کد پیگیری پرداخت"
                    value={toPersianNumber(Number(order.transactionId) || "ثبت نشده") }
                />

                <div className="space-y-2">
                    <p className="text-xs text-slate-400">وضعیت سفارش</p>
                    <span
                        className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold ${OrderStatus[order.status]?.class ??
                            "bg-slate-100 text-slate-600"
                            }`}
                    >
                        {OrderStatus[order.status]?.title ?? "نامشخص"}
                    </span>
                </div>

                <div className="space-y-2">
                    <p className="text-xs text-slate-400">وضعیت پرداخت</p>
                    <span
                        className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold ${PaymentStatus[order.paymentStatus]?.class ??
                            "bg-slate-100 text-slate-600"
                            }`}
                    >
                        {PaymentStatus[order.paymentStatus]?.title ??
                            "نامشخص"}
                    </span>
                </div>

                <div className="space-y-2 sm:col-span-2">
                    <p className="text-xs text-slate-400">آدرس تحویل</p>
                    <p className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-sm leading-7 text-slate-700">
                        {order.address}
                    </p>
                </div>
            </div>

            {/* محصولات سفارش */}
            <div>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800">
                        محصولات سفارش
                    </h3>

                    <span className="text-xs text-slate-400">
                        {toPersianNumber(order.items.length)} محصول
                    </span>
                </div>

                <div className="divide-y divide-slate-100 rounded-xl border border-slate-100">
                    {order.items.map((item, index) => {
                        const discount = item.product.discount ?? 0;

                        const originalTotal = item.price * item.quantity;

                        const discountedTotal = Math.round(
                            item.price *
                            (1 - discount / 100) *
                            item.quantity
                        );

                        return (
                            <div
                                key={`${item.product}-${index}`}
                                className="flex items-center justify-between gap-4 p-4"
                            >
                                {/* اطلاعات محصول */}
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-slate-700">
                                        {item.name}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        تعداد:{" "}
                                        {toPersianNumber(item.quantity)}
                                    </p>

                                    {discount > 0 && (
                                        <span className="mt-2 inline-flex rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                                            {toPersianNumber(discount)}٪ تخفیف
                                        </span>
                                    )}
                                </div>

                                {/* قیمت محصول */}
                                <div className="shrink-0 text-left">
                                    {discount > 0 ? (
                                        <>
                                            <p className="text-xs text-slate-400 line-through">
                                                {toPersianPrice(originalTotal)} تومان
                                            </p>

                                            <p className="mt-1 text-sm font-extrabold text-emerald-700">
                                                {toPersianPrice(discountedTotal)} تومان
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-sm font-bold text-slate-700">
                                            {toPersianPrice(originalTotal)} تومان
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* مبلغ نهایی سفارش */}
            <div className="flex items-center justify-between rounded-xl bg-emerald-50/80 p-4">
                <span className="text-sm font-medium text-slate-600">
                    مبلغ نهایی
                </span>

                <span className="text-lg font-extrabold text-emerald-700">
                    {toPersianPrice(order.totalPrice)} تومان
                </span>
            </div>
        </div>
    );
}

function Info({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="min-w-0 space-y-2">
            <p className="text-xs text-slate-400">{label}</p>

            <p className="wrap-break-word text-sm font-semibold text-slate-700">
                {value}
            </p>
        </div>
    );
}

export default OrderDetail;