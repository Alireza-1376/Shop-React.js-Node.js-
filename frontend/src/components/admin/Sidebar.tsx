import { FiBarChart2, FiBox, FiChevronLeft, FiGrid, FiShoppingBag, FiUsers, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
    {
        title: "داشبورد",
        path: "dashboard",
        icon: FiGrid
    },
    {
        title: "دسته بندی",
        path: "categories",
        icon: FiBarChart2
    },
    {
        title: "محصولات",
        path: "products",
        icon: FiBox
    },
    {
        title: "سفارشات",
        path: "orders",
        icon: FiShoppingBag
    },
    {
        title: "کاربران",
        path: "users",
        icon: FiUsers
    }
];

type SidebarStateType = {
    sidebarOpen: boolean
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarStateType) {
    const location = useLocation()
    const path = location.pathname ;

    return (
        <div>
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden"
                />
            )}
            <aside className={`fixed right-0 top-0 z-50 flex h-screen w-72 flex-col border-l border-slate-100 bg-white transition-transform duration-300 lg:top-16 lg:z-40 lg:h-[calc(100vh-4rem)] lg:w-64 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex items-center justify-between border-b border-slate-100 p-4 lg:hidden">
                    <span className="text-sm font-black text-slate-800">
                        منوی مدیریت
                    </span>
                    <button onClick={() => setSidebarOpen(false)} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100">
                        <FiX size={19} />
                    </button>
                </div>

                <nav className="flex-1 space-y-1.5 p-4">
                    <p className="mb-4 px-3 text-[11px] font-bold text-slate-400">
                        منوی اصلی
                    </p>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = path.includes(item.path)
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold transition-all ${isActive
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-emerald-600"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={19} className={isActive ? "text-emerald-500" : "text-slate-400 group-hover:text-emerald-500"} />
                                    <span>
                                        {item.title}
                                    </span>
                                </div>

                                {isActive && (
                                    <FiChevronLeft size={16} />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-slate-100 p-4">
                    <div className="rounded-2xl bg-emerald-50 p-4">
                        <p className="text-xs font-black text-slate-800">
                            پنل مدیریت فروشگاه
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-slate-500">
                            مدیریت محصولات، سفارشات و کاربران
                        </p>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar;