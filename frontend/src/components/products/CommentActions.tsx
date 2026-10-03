import { useState } from "react";
import Modal from "../../ui/Modal";
import { useDeleteComment } from "./useDeleteComment";
import Loading from "../../ui/Loading";
import { useUpdateComment } from "./useUpdateComment";
import type { CommentType } from "../../types/comment";

function CommentActions({ comment }: { comment: CommentType }) {
    const [isDelete, setIsDelete] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const { isDeleting, deleting } = useDeleteComment();
    const { isUpdating, updating } = useUpdateComment();
    const [text, setText] = useState(comment.text);

    async function handleDelete(commentId: string) {
        await deleting(commentId)
        setIsDelete(false)
    }

    async function handleUpdate(commentId: string, text: string) {
        await updating({ id: commentId, data: { text: text } })
        setIsUpdate(false)
    }

    return (
        <div className="mt-2 flex items-center gap-3">
            <button
                onClick={() => { setIsUpdate(true) }}
                type="button"
                className="cursor-pointer text-xs font-bold text-blue-500 transition hover:text-blue-600"
            >
                ویرایش
            </button>
            <Modal
                isOpen={isUpdate}
                onClose={() => setIsUpdate(false)}
                title="ویرایش"
            >
                <div>
                    <textarea value={text} onChange={(e) => { setText(e.target.value) }} placeholder="پاسخ خود را بنویسید" rows={3} maxLength={1000} className="min-h-20 border border-gray-300 w-full p-2 rounded-lg flex-1 resize-none bg-transparent pt-1 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-300" />
                    <button
                        type="button"
                        onClick={() => { handleUpdate(comment._id, text) }}
                        className="flex w-full cursor-pointer h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 sm:self-end"
                    >
                        {isUpdating ? "در حال ارسال..." : "ویرایش"}
                    </button>
                </div>
            </Modal>



            <button
                onClick={() => { setIsDelete(true) }}
                type="button"
                className="cursor-pointer text-xs font-bold text-red-500 transition hover:text-red-600"
            >
                حذف
            </button>
            <Modal
                isOpen={isDelete}
                onClose={() => { setIsDelete(false) }}
                title="حذف"
            >
                <p className="mb-4">آیا از حذف نظر مطمئن هستید ؟</p>
                <div className="flex items-center gap-4">
                    <button onClick={() => { setIsDelete(false) }} className="flex-1 border border-red-500 text-red-500 p-2 rounded-md cursor-pointer shadow-lg hover:shadow-red-500">انصراف</button>
                    <button onClick={() => handleDelete(comment._id)} className="flex-1 bg-emerald-500 text-white p-2 rounded-md cursor-pointer shadow-lg hover:shadow-emerald-500 ">
                        {isDeleting ? <span className="text-center w-full flex items-center justify-center"><Loading size={20} /></span> : "تایید"}
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default CommentActions;