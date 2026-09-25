import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Modal from "../../../ui/Modal";
import { useState } from "react";
import { useDeleteCategory } from "./useDeleteCategory";
import Loading from "../../../ui/Loading";
import type { CategoryType } from "../../../types/category";
import CategoryForm from "./CategoryForm";

function Actions({ category }: { category: CategoryType }) {
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const { isPending, mutateAsync } = useDeleteCategory()

    const handleDelete = async (id: string) => {
        await mutateAsync(id, {
            onSuccess: () => {
                setDeleteModal(false)
            }
        })
    };

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={() => setEditModal(true)}
                title="ویرایش"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 transition-all hover:bg-emerald-500 hover:text-white"
            >
                <FiEdit2 size={16} />
            </button>
            <Modal
                isOpen={editModal}
                onClose={() => { setEditModal(false) }}
                title="ویرایش دسته بندی"
            >
                <CategoryForm setOpenModal={setEditModal} category={category}/>
            </Modal>

            <button
                onClick={() => setDeleteModal(true)}
                title="حذف"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-400 transition-all hover:bg-red-500 hover:text-white"
            >
                <FiTrash2 size={16} />
            </button>
            <Modal
                isOpen={deleteModal}
                onClose={() => { setDeleteModal(false) }}
                title="حذف دسته بندی"
            >
                <p className="text-start mb-4">آیا از حذف {category.title} مطمئن هستید ؟</p>
                <div className="flex items-center gap-4">
                    <button onClick={() => { setDeleteModal(false) }} className="flex-1 border border-red-500 text-red-500 p-2 rounded-md cursor-pointer shadow-lg hover:shadow-red-500">انصراف</button>
                    <button onClick={() => handleDelete(category._id)} className="flex-1 bg-emerald-500 text-white p-2 rounded-md cursor-pointer shadow-lg hover:shadow-emerald-500 ">
                        {isPending ? <span className="text-center w-full flex items-center justify-center"><Loading size={20} /></span> : "تایید"}
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default Actions;