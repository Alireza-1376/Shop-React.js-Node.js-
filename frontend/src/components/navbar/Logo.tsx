import { FiShoppingBag } from "react-icons/fi"

function Logo() {
    return (
        <a className="flex shrink-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                <FiShoppingBag size={23} />
            </div>
            <div className="">
                <h1 className="m-0 text-base font-extrabold leading-6 text-slate-800">فروشگاه علیرضا</h1>
                <p className="m-0 text-[11px] font-medium text-emerald-500">خریدی آسان و مطمئن</p>
            </div>
        </a>
    )
}

export default Logo