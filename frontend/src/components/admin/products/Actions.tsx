import { FiEdit2, FiImage, FiTrash2 } from "react-icons/fi";
import Modal from "../../../ui/Modal";
import { useState } from "react";
import ProductForm from "./ProductForm";
import type { ProductType } from "../../../types/product";
import Loading from "../../../ui/Loading";
import { useDeleteProduct } from "./useDeleteProduct";

function Actions({ product }: { product: ProductType }) {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const { isPending, mutateAsync } = useDeleteProduct();

    async function handleDelete(id: string) {
        await mutateAsync(id, {
            onSuccess: () => {
                setDeleteModal(false)
            }
        })
    }

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={() => { setEditModal(true) }}
                type="button"
                title="ویرایش"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 transition-all hover:bg-emerald-500 hover:text-white"
            >
                <FiEdit2 size={16} />
            </button>
            <Modal
                title="ویرایش محصول"
                isOpen={editModal}
                onClose={() => { setEditModal(false) }}
            >
                <ProductForm setOpenModal={setEditModal} product={product} />
            </Modal>

            <button
                type="button"
                title="افزودن تصویر"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-blue-50 text-blue-500 transition-all hover:bg-blue-500 hover:text-white"
            >
                <FiImage size={16} />
            </button>

            <button
                onClick={() => { setDeleteModal(true) }}
                type="button"
                title="حذف"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-400 transition-all hover:bg-red-500 hover:text-white"
            >
                <FiTrash2 size={16} />
            </button>
            <Modal
                title="حذف محصول"
                isOpen={deleteModal}
                onClose={() => { setDeleteModal(false) }}
            >
                <p className="text-start mb-4">آیا از حذف {product.title} مطمئن هستید ؟</p>
                <div className="flex items-center gap-4">
                    <button onClick={() => { setDeleteModal(false) }} className="flex-1 border border-red-500 text-red-500 p-2 rounded-md cursor-pointer shadow-lg hover:shadow-red-500">انصراف</button>
                    <button onClick={() => handleDelete(product._id)} className="flex-1 bg-emerald-500 text-white p-2 rounded-md cursor-pointer shadow-lg hover:shadow-emerald-500 ">
                        {isPending ? <span className="text-center w-full flex items-center justify-center"><Loading size={20} /></span> : "تایید"}
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default Actions;