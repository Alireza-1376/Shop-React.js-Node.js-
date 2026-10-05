import toPersianPrice from "../../utils/toPersianPrice";
import toPersianNumber from "../../utils/toPersianNumber";
import type { CartItem } from "../../types/cart";



function CheckoutProductItem({
    item,
}: { item: CartItem }) {
    const price = item.product.price;
    const discount = item.product.discount || 0;

    const finalPrice =
        price - (price * discount) / 100;

    return (
        <div className="flex gap-3">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <img
                    src={`http://localhost:5000/${item.product.image?.[0]}`}
                    alt={item.product.title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-medium text-gray-700">
                    {item.product.title}
                </h3>

                <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-xs text-gray-400">
                        تعداد:{" "}
                        {toPersianNumber(item.quantity)}
                    </span>

                    <span className="text-sm font-medium text-gray-700">
                        {toPersianPrice(
                            finalPrice * item.quantity
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CheckoutProductItem;
