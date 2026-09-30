import { useEffect, useState } from "react";
import type { ProductType } from "../../types/product";

function ImageGallery({ product }: { product: ProductType }) {
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        if (product.image?.length) {
            setSelectedImage(product.image[0]);
        }
    }, [product]);

    const imageUrl = selectedImage
        ? `http://localhost:5000/${selectedImage}`
        : "";

    return (
        <div className="border-b border-slate-100 p-4 sm:p-6 lg:border-b-0 lg:border-l">
            <div className="flex flex-col gap-4 sm:flex-row-reverse">
                {/* Main image */}
                <div className="flex-1">
                    <div className="aspect-square overflow-hidden rounded-2xl bg-slate-50">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={product.title}
                                className="h-full w-full object-contain p-4 transition-transform duration-500 hover:scale-105 sm:p-8"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-sm font-medium text-slate-400">
                                تصویری وجود ندارد
                            </div>
                        )}
                    </div>
                </div>

                {/* Thumbnails */}
                {product.image?.length > 0 && (
                    <div className="flex gap-3 overflow-x-auto pb-1 sm:w-24 sm:flex-col sm:overflow-x-visible sm:overflow-y-auto sm:pb-0">
                        {product.image.map((image, index) => {
                            const isSelected = selectedImage === image;

                            return (
                                <button
                                    key={image}
                                    type="button"
                                    onClick={() =>
                                        setSelectedImage(image)
                                    }
                                    className={`h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 bg-slate-50 transition-all sm:h-20 sm:w-20 ${isSelected
                                        ? "border-emerald-500 shadow-md shadow-emerald-100"
                                        : "border-transparent hover:border-slate-200"
                                        }`}
                                >
                                    <img
                                        src={`http://localhost:5000/${image}`}
                                        alt={`${product.title} ${index + 1}`}
                                        className="h-full w-full object-contain p-1.5"
                                    />
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImageGallery