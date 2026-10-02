import { FiRotateCcw, FiSearch, FiSliders } from "react-icons/fi";
import toPersianPrice from "../../utils/toPersianPrice";
import type { CategoryType } from "../../types/category";
import { useSearchParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from "react";

function ProductFilters({ categories }: { categories: CategoryType[] }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category") ?? "";
    const [price, setPrice] = useState<number[]>([1000, 30000]);
    const [isPriceChanged, setIsPriceChanged] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (!isPriceChanged) return;

        const timer = setTimeout(() => {
            setSearchParams((prev) => {
                prev.set("minPrice", String(price[0]))
                prev.set("maxPrice", String(price[1]))
                return prev
            })
        }, 2000)

        return () => {
            clearTimeout(timer)
        }
    }, [price])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue.trim()) {
                setSearchParams((prev) => {
                    prev.set("search", inputValue);
                    return prev;
                });
            } else {
                setSearchParams((prev) => {
                    prev.delete("search");
                    return prev;
                });
            }
        }, 2000)

        return () => {
            clearTimeout(timer)
        }
    }, [inputValue])

    const handleChangePrice = (_event: Event, newValue: number[]) => {
        setPrice(newValue);
        setIsPriceChanged(true)
    };

    function handleSearch(value: string) {
        setInputValue(value.trim())
    }

    function deleteFilter() {
        setSearchParams("")
    }

    function filterWithCategory(englishTitle: string) {
        if (englishTitle.trim().length > 0) {
            setSearchParams((prev) => {
                prev.set("category", englishTitle)
                return prev
            })
        } else {
            setSearchParams((prev) => {
                prev.delete("category")
                return prev
            })
        }
    }

    return (
        <aside className="h-fit lg:max-h-[85vh] overflow-x-hidden overflow-auto scrollbar-thin rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:sticky lg:top-22">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
                        <FiSliders size={18} />
                    </div>

                    <h2 className="text-base font-black text-slate-800">
                        فیلتر
                    </h2>
                </div>

                <button
                    onClick={() => { deleteFilter() }}
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
                        value={inputValue}
                        onChange={(e) => handleSearch(e.target.value)}
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
                        onClick={() => { filterWithCategory("") }}
                        type="button"
                        className={`${category == "" ? "text-emerald-600 bg-emerald-50" : "text-slate-500"} w-full cursor-pointer rounded-xl px-3.5 py-2.5 text-right text-sm font-bold `}
                    >
                        همه محصولات
                    </button>

                    {categories.map((c) => (
                        <div
                            onClick={() => { filterWithCategory(c.englishTitle) }}
                            key={c._id}
                            className={`${category == c.englishTitle ? "text-emerald-600 bg-emerald-50" : "text-slate-500"} w-full cursor-pointer rounded-xl px-3.5 py-2.5 text-right text-sm font-semibold transition-colors hover:bg-slate-50 hover:text-emerald-600`}
                        >
                            {c.title}
                        </div>
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
                            {toPersianPrice(price[0])} تومان
                        </span>
                    </div>

                    <div className="text-slate-300">-</div>

                    <div className="text-left">
                        <span className="mb-1 block text-xs text-slate-400">
                            تا
                        </span>

                        <span className="text-sm font-bold text-slate-700">
                            {toPersianPrice(price[1])} تومان
                        </span>
                    </div>
                </div>

                <Box style={{ width: "100%" }}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={price}
                        onChange={handleChangePrice}
                        valueLabelDisplay="auto"
                        min={1000}
                        max={30000}
                    />
                </Box>
            </div>
        </aside>
    );
}

export default ProductFilters;
