import { FiX } from "react-icons/fi";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl shadow-slate-900/10"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex flex-row-reverse items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                    >
                        <FiX size={20} />
                    </button>

                    <h2 className="text-base font-black text-slate-800 sm:text-lg">
                        {title}
                    </h2>
                </div>

                <div className="max-h-[calc(100vh-10rem)] overflow-y-auto p-5 sm:p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;