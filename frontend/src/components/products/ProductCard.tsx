import { FiHeart, FiShoppingCart } from "react-icons/fi";
import type { ProductType } from "../../types/product";
import toPersianNumber from "../../utils/toPersianNumber";
import { useLikeProduct } from "./useLikeProduct";
import { useUser } from "../../hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";

type ProductCardProps = {
    product: ProductType;
};

function ProductCard({ product }: ProductCardProps) {
    const queryClient = useQueryClient();
    const { mutateAsync } = useLikeProduct();
    const { user } = useUser()
    async function handleLikeProduct(id: string) {
        await mutateAsync(id)
        await queryClient.invalidateQueries({ queryKey: ["user"] });
    }

    const hasDiscount = product.discount > 0;
    const isOutOfStock = product.stock <= 0;

    const finalPrice = hasDiscount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    const image = product.image?.[0];

    const isLiked = user?.likedProducts?.some(
        (like) => like === product._id.toString()
    );

    return (
        <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5">
            <div className="relative aspect-square overflow-hidden bg-white px-3 pt-3">
                <div className="h-full w-full overflow-hidden rounded-xl bg-slate-100">
                    {image ? (
                        <img
                            src={`http://localhost:5000/${image}`}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                            تصویری وجود ندارد
                        </div>
                    )}
                </div>
            </div>

            <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                <div className="flex h-10 items-center gap-3">
                    <h3 className="line-clamp-2 flex-1 text-[15px] font-extrabold leading-5 text-slate-800 sm:text-base">
                        {product.title}
                    </h3>

                    <button
                        className="flex items-center justify-center gap-1 cursor-pointer bg-red-100 hover:bg-red-200 transition-all duration-200 p-1 rounded-md"
                        onClick={(e) => { e.preventDefault(); handleLikeProduct(product._id) }}
                    >
                        <span className={`text-red-500 text-sm`}>{toPersianNumber(product.likes.length)}</span>
                        <FiHeart size={17} className={`${isLiked && "fill-red-500"} text-red-500`} />
                    </button>
                </div>

                <div className="mb-3 mt-3 min-h-12">
                    <div className="mb-1 flex h-5 items-center gap-2 text-xs text-slate-400">
                        {hasDiscount && (
                            <span className="line-through">
                                {toPersianNumber(product.price)} تومان
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-base font-black text-emerald-600 sm:text-lg">
                                {toPersianNumber(Math.round(finalPrice))} تومان
                            </span>

                            {hasDiscount && (
                                <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-500">
                                    {toPersianNumber(product.discount)}٪
                                </span>
                            )}
                        </div>

                        {!isOutOfStock && (
                            <span className="text-xs font-medium text-slate-400">
                                {toPersianNumber(product.stock)} عدد
                            </span>
                        )}
                    </div>
                </div>

                <button
                    onClick={(e) => { e.preventDefault() }}
                    type="button"
                    disabled={isOutOfStock}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-500 px-3 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                >
                    <FiShoppingCart size={17} />
                    {isOutOfStock ? "ناموجود" : "افزودن به سبد خرید"}
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
