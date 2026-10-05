import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function CheckoutHeader() {
    return (
        <div className="mb-8 flex items-center gap-3">
            <Link
                to="/cart"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-gray-600 shadow-sm transition-all hover:bg-emerald-50 hover:text-emerald-600"
            >
                <FiArrowRight size={19} />
            </Link>

            <div>
                <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
                    تکمیل سفارش
                </h1>
            </div>
        </div>
    );
}

export default CheckoutHeader;
