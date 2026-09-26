import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../ui/Modal";
import ProductForm from "./ProductForm";


function AddProduct() {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            <button onClick={() => { setOpenModal(true) }} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-500/15 transition-all hover:bg-emerald-600 hover:shadow-lg active:scale-[0.98] sm:w-auto">
                <FiPlus size={18} />
                افزودن محصول
            </button>
            <Modal isOpen={openModal} onClose={() => { setOpenModal(false) }} title="افزودن محصول">
                <ProductForm setOpenModal={setOpenModal}/>
            </Modal>
        </div>
    )
}

export default AddProduct;