import { FiGrid, FiLogOut, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Header({ setSidebarOpen }: { setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const navigate = useNavigate();
    return (
        <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-slate-100 bg-white" >
            <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Right */}
                <div className="flex items-center gap-3">
                    <button onClick={() => setSidebarOpen(true)} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-600 lg:hidden">
                        <FiMenu size={21} />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                            <FiGrid size={18} />
                        </div>

                        <div>
                            <h1 className="text-sm font-black text-slate-800 sm:text-base">
                                پنل مدیریت
                            </h1>

                            <p className="hidden text-[10px] text-slate-400 sm:block">
                                مدیریت فروشگاه
                            </p>
                        </div>
                    </div>
                </div>

                {/* Left */}
                <button
                    onClick={() => { navigate("/") }}
                    className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-red-500 transition hover:bg-red-50"
                >
                    <FiLogOut size={18} />
                    <span className="hidden sm:block">
                        خروج
                    </span>
                </button>
            </div>
        </header>
    )
}

export default Header;