import { FiLogIn, FiLogOut, FiSettings, FiUser } from "react-icons/fi"
import { Link } from "react-router-dom"
import type { UserItems } from "../../types/auth";
import Loading from "../../ui/Loading";

type MobileUserPropsType = {
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
    user: UserItems
    isLoading: boolean,
    logout: () => void
}

function MobileUser({ setMobileOpen, user, isLoading, logout }: MobileUserPropsType) {

    return (
        <div>
            {isLoading ? <div className="w-full flex justify-center"><Loading size={30} /></div> :
                !user ? (
                    <Link to="/login" className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition-colors hover:bg-emerald-600">
                        <FiLogIn size={18} />
                        ورود / ثبت نام
                    </Link>
                ) : (
                    <div className="space-y-1">
                        <div className="mb-3 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4">
                            <img src="/images/user.jpg" alt="user" className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-200" />
                            <div>
                                <p className="m-0 text-sm font-bold text-slate-800">{user.username}</p>
                                <span className="text-xs text-emerald-600">حساب کاربری</span>
                            </div>
                        </div>

                        <a href="#profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-emerald-50 hover:text-emerald-600">
                            <FiUser size={18} />
                            مشاهده پروفایل
                        </a>

                        {user.role==="admin" && (
                            <Link to="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-emerald-50 hover:text-emerald-600">
                                <FiSettings size={18} />
                                پنل مدیریت
                            </Link>
                        )}

                        <button onClick={() => logout()} className="flex cursor-pointer w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-all hover:bg-red-50">
                            <FiLogOut size={18} />
                            خروج
                        </button>

                    </div>
                )}
        </div>
    )
}

export default MobileUser