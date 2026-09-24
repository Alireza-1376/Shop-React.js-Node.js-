import { FiChevronDown, FiLogIn, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { UserItems } from "../../types/auth";
import Loading from "../../ui/Loading";

type DesktopUserPropsTypes = {
    userMenuRef: React.RefObject<HTMLDivElement | null>
    userMenuOpen: boolean
    setUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    user: UserItems
    isLoading: boolean,
    logout: () => void
}

function DesktopUser({ userMenuRef, userMenuOpen, setUserMenuOpen, user, isLoading, logout }: DesktopUserPropsTypes) {

    return (
        <div ref={userMenuRef} className="relative hidden lg:block">
            {isLoading ? <div className="w-full flex justify-center"><Loading size={30} /></div>
                :
                !user ? (
                    <Link to="/login" className="flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-600 hover:shadow-lg active:scale-95">
                        <FiLogIn size={18} />
                        ورود / ثبت نام
                    </Link>
                ) :
                    <>
                        <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 transition-all hover:border-slate-200 hover:bg-slate-50">
                            <img src="/images/user.jpg" alt="user" className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-100" />
                            <div className="text-right">
                                <p className="m-0 text-sm font-bold text-slate-800">{user.username}</p>
                                <span className="text-[11px] text-slate-400">حساب کاربری</span>
                            </div>
                            <FiChevronDown size={17} className={`text-slate-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                        </button>

                        {userMenuOpen && (
                            <div className="absolute left-0 top-[calc(100%+10px)] w-60 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-900/10">
                                <div className="mb-2 flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
                                    <img src="/images/user.jpg" alt="user" className="h-10 w-10 rounded-full object-cover" />
                                    <div>
                                        <p className="m-0 text-sm font-bold text-slate-800">علیرضا حبیبی</p>
                                        <span className="text-[11px] text-emerald-600">کاربر وارد شده</span>
                                    </div>
                                </div>
                                <a href="#profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-600">
                                    <FiUser size={18} />
                                    مشاهده پروفایل
                                </a>
                                {user.role === "admin" && (
                                    <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-600">
                                        <FiSettings size={18} />
                                        پنل مدیریت
                                    </Link>
                                )}
                                <div className="my-1 border-t border-slate-100" />

                                <button onClick={() => { logout() }} className="flex cursor-pointer w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50">
                                    <FiLogOut size={18} />
                                    خروج
                                </button>
                            </div>
                        )}
                    </>
            }


        </div >
    )
}

export default DesktopUser;