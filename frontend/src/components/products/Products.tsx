import { useGetProducts } from "../../hooks/useGetProducts";
import { useGetCategories } from "../../hooks/useGetCategories";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import Loading from "../../ui/Loading";
import { Link } from "react-router-dom";

function MainProducts() {
    const { isLoading, products } = useGetProducts();
    const { data: categoriesData } = useGetCategories();

    const categories = categoriesData ?? [];

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <h1 className="text-2xl font-black text-slate-800 sm:text-3xl">
                        محصولات
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        محصولات مورد نظر خود را مشاهده و انتخاب کنید
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">

                    <ProductFilters
                        categories={categories}
                    />

                    <main>
                        {isLoading ? (
                            <div className="flex min-h-80 items-center justify-center">
                                <Loading size={40} />
                            </div>
                        ) : products?.products.length === 0 ? (
                            <div className="flex min-h-80 items-center justify-center rounded-2xl border border-slate-100 bg-white">
                                <p className="text-sm font-bold text-slate-400">
                                    محصولی برای نمایش وجود ندارد
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {products?.products.map((product) => (
                                    <Link to={`/products/${product._id}`} key={product._id}>
                                        <ProductCard
                                            product={product}
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </div>
    );
}

export default MainProducts;
