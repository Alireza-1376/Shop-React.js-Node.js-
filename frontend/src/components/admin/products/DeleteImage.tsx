import { RiDeleteBinLine } from "react-icons/ri"
import { useParams } from "react-router-dom";
import { useDeleteImage } from "./useDeleteImage";


function DeleteImage({ img }: { img: string }) {

    const { id } = useParams();
    const { mutateAsync } = useDeleteImage();

    async function handleDelete(img: string) {
        if (!id) return;
        await mutateAsync({ id, data: { imageName: img } })
    }


    return (
        <button
            onClick={() => { handleDelete(img) }}
            type="button"
            className="absolute cursor-pointer top-3 left-3 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:scale-110"
        >
            <RiDeleteBinLine size={20} />
        </button>
    )
}

export default DeleteImage