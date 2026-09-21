import { FiShoppingCart } from "react-icons/fi";

function MobileCart({ setMobileOpen }: { setMobileOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <a href="#cart" onClick={() => setMobileOpen(false)} className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-slate-600 transition-all hover:bg-emerald-50 hover:text-emerald-600">
            <div className="flex items-center gap-3">
                <FiShoppingCart size={19} className="text-emerald-500" />
                <span>سبد خرید</span>
            </div>
            {3 > 0 && (
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
                    {3}
                </span>
            )}
        </a>

    )
}

export default MobileCart;