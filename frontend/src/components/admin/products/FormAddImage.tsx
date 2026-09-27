import { PiPlus } from "react-icons/pi";
import { useAddImage } from "./useAddImage";
import { useParams } from "react-router-dom";

function FormAddImage() {
    const { mutateAsync } = useAddImage();
    const { id } = useParams();
    async function addImage(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file || !id) return;
        const formData = new FormData();
        formData.append("image", file)
        await mutateAsync({ id, data: formData })
    }
    return (
        <form className="aspect-square">
            <div className="relative w-full h-full overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-white shadow-sm hover:border-orange-500 hover:bg-orange-50 transition-all duration-300">

                <button
                    type="button"
                    className="flex items-center justify-center w-full h-full cursor-pointer"
                >
                    <PiPlus
                        size={42}
                        className="text-slate-400 transition-all duration-300 hover:text-orange-500"
                    />
                </button>

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                        addImage(e)
                    }}
                    className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </form>
    )
}

export default FormAddImage