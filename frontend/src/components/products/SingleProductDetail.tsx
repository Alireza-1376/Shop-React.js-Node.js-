import { FiCheck, FiShoppingCart } from "react-icons/fi"
import type { ProductType } from "../../types/product"
import toPersianPrice from "../../utils/toPersianPrice"
import toPersianNumber from "../../utils/toPersianNumber"

function SingleProductDetail({ product }: { product: ProductType }) {
    const isOutOfStock = product.stock <= 0;
    const hasDiscount = product.discount > 0;
    const finalPrice = hasDiscount
        ? Math.round(product.price - (product.price * product.discount) / 100)
        : product.price;
    return (
        <div className="flex flex-col p-5 sm:p-7 lg:p-10">
            {/* Category */}
            {product.category?.title && (
                <div className="mb-4">
                    <span className="inline-flex rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                        {product.category.title}
                    </span>
                </div>
            )}

            {/* Title */}
            <h1 className="text-2xl font-black leading-9 text-slate-800 sm:text-3xl">
                {product.title}
            </h1>

            {/* Description */}
            <div className="mt-6 border-t border-slate-100 pt-6">
                <h2 className="mb-3 text-sm font-black text-slate-800">
                    درباره محصول
                </h2>

                <div className="space-y-2 text-sm leading-7 text-slate-500 sm:text-[15px]">
                    {product.description
                        .split("\n")
                        .filter((line) => line.trim())
                        .map((line, index) => (
                            <p key={index}>{line.trim()}</p>
                        ))}
                </div>
            </div>

            {/* Price */}
            <div className="mt-7 rounded-2xl bg-slate-50 p-4 sm:p-5">
                {hasDiscount && (
                    <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm text-slate-400 line-through">
                            {toPersianPrice(product.price)} تومان
                        </span>

                        <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-500">
                            {toPersianNumber(product.discount)}٪ تخفیف
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between gap-3">
                    <div>
                        <span className="block text-xs font-medium text-slate-400">
                            قیمت نهایی
                        </span>

                        <span className="mt-1 block text-xl font-black text-emerald-600 sm:text-2xl">
                            {toPersianPrice(finalPrice)} تومان
                        </span>
                    </div>

                    {!isOutOfStock && (
                        <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600">
                            <FiCheck size={15} />
                            موجود
                            <span>
                                ({toPersianNumber(product.stock)} عدد)
                            </span>
                        </div>
                    )}

                    {isOutOfStock && (
                        <span className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-500">
                            ناموجود
                        </span>
                    )}
                </div>
            </div>

            {/* Add to cart */}
            <button
                type="button"
                disabled={isOutOfStock}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white transition-all hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
            >
                <FiShoppingCart size={19} />
                {isOutOfStock
                    ? "محصول ناموجود است"
                    : "افزودن به سبد خرید"}
            </button>
        </div>
    )
}

export default SingleProductDetail