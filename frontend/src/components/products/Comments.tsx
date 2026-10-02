import { useState } from "react";
import {
    FiCornerUpRight,
    FiMessageCircle,
    FiSend,
    FiUser,
} from "react-icons/fi";
import { useGetProductComments } from "./useGetProductComments";
import { useAddcomment } from "./useAddComment";
import toLocalDateShort from "../../utils/toLocalDateShort";
import Modal from "../../ui/Modal";

function CommentSection({ productId }: { productId: string }) {
    const [isReply, setIsReply] = useState(false);
    const { isLoading, data } = useGetProductComments();
    const { isPending, mutateAsync } = useAddcomment();
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const [text, setText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [replyUserName, setReplyUserName] = useState("");
    const comments = data ?? [];

    const mainComments = comments.filter((comment) => !comment.parent);

    const getReplies = (commentId: string) => comments.filter((comment) => comment.parent === commentId);

    async function handleSubmit() {
        const mainText = text.trim();
        const reply = replyText.trim();

        if (isPending) return;

        if (replyTo && !reply) return;

        if (!replyTo && !mainText) return;

        try {
            await mutateAsync({
                productId,
                text: replyTo ? reply : mainText,
                parentId: replyTo,
            });

            if (replyTo) {
                setIsReply(false)
            }
            setText("");
            setReplyText("")
            setReplyTo(null);
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return (
            <section className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-400">
                    در حال دریافت نظرات...
                </p>
            </section>
        );
    }

    return (
        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                    <FiMessageCircle size={19} />
                </div>

                <h2 className="text-base font-black text-slate-800">
                    نظرات
                </h2>
            </div>

            <div className="border-b border-slate-100 bg-slate-50/50 p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex flex-1 items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 transition focus-within:border-emerald-300">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
                            <FiUser size={17} />
                        </div>

                        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="نظر خود را بنویسید" rows={3} maxLength={1000} className="min-h-20 flex-1 resize-none bg-transparent pt-1 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-300" />
                    </div>

                    <button
                        type="button"
                        disabled={!text.trim() || isPending}
                        onClick={handleSubmit}
                        className="flex cursor-pointer h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 sm:self-end"
                    >
                        <FiSend size={16} />

                        {isPending ? "در حال ارسال..." : "ثبت نظر"}
                    </button>
                </div>

                <div className="mt-2 text-left text-[11px] text-slate-400">
                    {text.length} / ۱۰۰۰
                </div>
            </div>

            <div className="p-4 sm:p-5">
                {mainComments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
                            <FiMessageCircle size={25} />
                        </div>

                        <p className="mt-3 text-sm font-bold text-slate-500">
                            هنوز نظری ثبت نشده است
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {mainComments.map((comment) => {
                            const replies = getReplies(comment._id);

                            return (
                                <div key={comment._id}>
                                    <div className="rounded-2xl border border-slate-300 p-4 transition hover:border-emerald-200">
                                        <div className="flex gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-black text-emerald-500">
                                                <img src="/images/user.jpg" alt="" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-sm font-black text-slate-700">
                                                        {comment.user?.username}
                                                    </span>

                                                    <span className="text-[10px] text-slate-400">
                                                        {toLocalDateShort(comment.createdAt)}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
                                                        {comment.text}
                                                    </p>
                                                    <div className="mt-2 flex items-center gap-3">
                                                        <button
                                                            type="button"
                                                            className="cursor-pointer text-xs font-bold text-blue-500 transition hover:text-blue-600"
                                                        >
                                                            ویرایش
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="cursor-pointer text-xs font-bold text-red-500 transition hover:text-red-600"
                                                        >
                                                            حذف
                                                        </button>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setIsReply(true)
                                                        setReplyTo(comment._id)
                                                        setReplyUserName(comment.user?.username || "")
                                                    }}
                                                    className="mt-2 cursor-pointer flex items-center gap-1 text-xs font-bold text-emerald-500 transition hover:text-emerald-600"
                                                >
                                                    <FiCornerUpRight size={13} />
                                                    پاسخ
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                    {replies.length > 0 && (
                                        <div className="mr-5 mt-2 space-y-2 border-r-2 border-emerald-200 pr-3 sm:mr-8 sm:pr-4">
                                            {replies.map((reply) => (
                                                <div
                                                    key={reply._id}
                                                    className="rounded-xl bg-slate-50 p-3"
                                                >
                                                    <div className="flex gap-3">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-black text-emerald-500">
                                                            <img src="/images/user.jpg" alt="" />
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <span className="text-xs font-black text-slate-700">
                                                                    {reply.user?.username}
                                                                </span>

                                                                <span className="text-[10px] text-slate-400">
                                                                    {toLocalDateShort(reply.createdAt)}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center justify-between">
                                                                <p className="mt-1 text-xs font-medium leading-6 text-slate-500">
                                                                    {reply.text}
                                                                </p>
                                                                <div className="mt-2 flex items-center gap-3">
                                                                    <button
                                                                        type="button"
                                                                        className="cursor-pointer text-xs font-bold text-blue-500 transition hover:text-blue-600"
                                                                    >
                                                                        ویرایش
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        className="cursor-pointer text-xs font-bold text-red-500 transition hover:text-red-600"
                                                                    >
                                                                        حذف
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <Modal
                            isOpen={isReply}
                            onClose={() => { setIsReply(false) }}
                            title={`پاسخ به ${replyUserName}`}
                        >
                            <div>
                                <textarea value={replyText} onChange={(e) => { setReplyText(e.target.value) }} placeholder="پاسخ خود را بنویسید" rows={3} maxLength={1000} className="min-h-20 border border-gray-300 w-full p-2 rounded-lg flex-1 resize-none bg-transparent pt-1 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-300" />
                                <button
                                    type="button"
                                    disabled={!replyText.trim() || isPending}
                                    onClick={handleSubmit}
                                    className="flex w-full cursor-pointer h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 sm:self-end"
                                >
                                    <FiSend size={16} />
                                    {isPending ? "در حال ارسال..." : "ثبت پاسخ"}
                                </button>
                            </div>
                        </Modal>
                    </div>

                )}
            </div>
        </section>
    );
}

export default CommentSection;