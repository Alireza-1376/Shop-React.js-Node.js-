import { FiCreditCard } from "react-icons/fi";
import toPersianPrice from "../../utils/toPersianPrice";
import toPersianNumber from "../../utils/toPersianNumber";
import CheckoutProductItem from "./CheckoutProductItem";
import type { CartItem } from "../../types/cart";

interface OrderSummaryProps {
    cart: CartItem[];
    totalPrice: number;
    totalItems: number;
}

function OrderSummary({
    cart,
    totalPrice,
    totalItems,
}: OrderSummaryProps) {
    return (
        <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                            <FiCreditCard
                                size={19}
                                className="text-emerald-500"
                            />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-800">
                                خلاصه سفارش
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                {toPersianNumber(totalItems)} کالا
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {cart.map((item) => (
                        <CheckoutProductItem
                            key={item.product._id}
                            item={item}
                        />
                    ))}
                </div>

                <div className="my-6 h-px bg-gray-100" />

                <div className="my-5 h-px bg-gray-100" />

                <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">
                        مبلغ قابل پرداخت
                    </span>

                    <div className="text-left flex items-center gap-2">
                        <span className="block text-lg font-bold text-gray-900">
                            {toPersianPrice(totalPrice)}
                        </span>

                        <span className="font-bold">
                            تومان
                        </span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-emerald-500 text-sm font-medium text-white transition-all hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    ادامه و پرداخت
                </button>
            </div>
        </div>
    );
}

export default OrderSummary;