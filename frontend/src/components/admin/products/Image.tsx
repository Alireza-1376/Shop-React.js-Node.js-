import { useNavigate } from "react-router-dom"
import FormAddImage from "./FormAddImage"
import { useGetProduct } from "./useGetProduct";
import DeleteImage from "./DeleteImage";
import Loading from "../../../ui/Loading";

function Image() {
    const navigate = useNavigate();
    const { isLoading, data } = useGetProduct();
    console.log(data?.product);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-extrabold text-slate-800">افزودن تصویر</h2>
                <button onClick={() => { navigate(-1) }} className="bg-emerald-500 text-white rounded-md py-2 px-6 cursor-pointer hover:bg-emerald-600 transition-all duration-200">بازگشت</button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {isLoading ? <div className="flex items-center justify-center"><Loading size={40} /></div> :
                    <>
                        {data?.product.image.map((img: string, index: number) => (
                            <div
                                key={index}
                                className="group relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <img
                                    src={`http://localhost:5000/${img}`}
                                    alt={`Product Image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                                Delete Button
                                <DeleteImage img={img} />
                            </div>
                        ))}
                    </>
                }



                <FormAddImage />
            </div>
        </div>
    )
}

export default Image