import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useGetProduct } from "../../hooks/useGetProduct";
import Loading from "../../ui/Loading";
import ImageGallery from "./ImageGallery";
import SingleProductDetail from "./SingleProductDetail";
import { useEffect } from "react";

function SingleProduct() {
    const { isLoading, data } = useGetProduct();
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <Loading size={50} />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="rounded-2xl px-8 py-10 text-center">
                    <p className="font-bold text-slate-500">
                        محصول مورد نظر پیدا نشد
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="mt-5 cursor-pointer rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
                    >
                        بازگشت
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-12 pt-24 sm:pt-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Back button */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-5 flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-500 shadow-sm transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                >
                    <FiArrowRight size={17} />
                    بازگشت به صفحه قبل
                </button>

                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
                    <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
                        {/* Gallery */}
                        <ImageGallery product={data.product} />

                        {/* Product information */}
                        <SingleProductDetail product={data.product} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;
