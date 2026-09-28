import { FiRotateCcw, FiSearch, FiSliders } from "react-icons/fi";
import toPersianNumber from "../../utils/toPersianNumber";
import toPersianPrice from "../../utils/toPersianPrice";

type Category = {
    _id: string;
    title: string;
};

type ProductFiltersProps = {
    categories: Category[];
};

function ProductFilters({ categories }: ProductFiltersProps) {
    return (
        <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:sticky lg:top-4">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
                        <FiSliders size={18} />
                    </div>

                    <h2 className="text-base font-black text-slate-800">
                        فیلتر محصولات
                    </h2>
                </div>

                <button
                    type="button"
                    className="flex cursor-pointer items-center gap-1.5 text-xs font-bold text-slate-400 transition-colors hover:text-emerald-500"
                >
                    <FiRotateCcw size={14} />
                    حذف فیلتر
                </button>
            </div>

            <div className="mb-5">
                <label
                    htmlFor="product-search"
                    className="mb-2 block text-sm font-bold text-slate-700"
                >
                    جستجو
                </label>

                <div className="relative">
                    <FiSearch
                        size={17}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        id="product-search"
                        type="text"
                        placeholder="نام محصول..."
                        className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-10 pl-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-50"
                    />
                </div>
            </div>

            <div className="mb-5">
                <label className="mb-2.5 block text-sm font-bold text-slate-700">
                    دسته‌بندی
                </label>

                <div className="space-y-1.5">
                    <button
                        type="button"
                        disabled
                        className="w-full cursor-not-allowed rounded-xl bg-emerald-50 px-3.5 py-2.5 text-right text-sm font-bold text-emerald-600"
                    >
                        همه محصولات
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category._id}
                            type="button"
                            className="w-full cursor-pointer rounded-xl px-3.5 py-2.5 text-right text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-50 hover:text-emerald-600"
                        >
                            {category.title}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="mb-3 block text-sm font-bold text-slate-700">
                    محدوده قیمت
                </label>

                <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <div>
                        <span className="mb-1 block text-xs text-slate-400">
                            از
                        </span>

                        <span className="text-sm font-bold text-slate-700">
                            {toPersianNumber(0)} تومان
                        </span>
                    </div>

                    <div className="text-slate-300">-</div>

                    <div className="text-left">
                        <span className="mb-1 block text-xs text-slate-400">
                            تا
                        </span>

                        <span className="text-sm font-bold text-slate-700">
                            {toPersianPrice(10000000)} تومان
                        </span>
                    </div>
                </div>

                <input
                    type="range"
                    min={0}
                    max={10000000}
                    value={5000000}
                    className="w-full cursor-pointer accent-emerald-500"
                />
            </div>
        </aside>
    );
}

export default ProductFilters;
