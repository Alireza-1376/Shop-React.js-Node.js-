import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import DesktopUser from "./DesktopUser";
import MobileUser from "./MobileUser";
import DesktopCart from "./DesktopCart";
import MobileCart from "./MobileCart";
import NavItems from "./NavItems";
import Logo from "./Logo";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useUser } from "../../hooks/useUser";
import { useLogout } from "../../hooks/useLogout";

function Navbar() {
    const { isLoading, user } = useUser();
    const { mutateAsync } = useLogout();
    const userMenuRef = useRef<HTMLDivElement>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    useOutsideClick(userMenuRef, () => setUserMenuOpen(false));

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    async function logout() {
        await mutateAsync()
    }

    return (
        <div>
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setMobileOpen(true)} className="flex cursor-pointer h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition-all hover:bg-emerald-50 hover:text-emerald-600 lg:hidden">
                            <FiMenu size={25} />
                        </button>
                        <Logo />
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex">
                        <NavItems />
                    </div>
                    <div className="flex items-center gap-2">
                        <DesktopCart />
                        <DesktopUser logout={logout} isLoading={isLoading} user={user} userMenuRef={userMenuRef} userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} />
                    </div>
                </div>
            </header>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-90 bg-slate-900/40 backdrop-blur-[2px] lg:hidden" />
            )}

            {/* Mobile Drawer */}
            <aside className={`fixed right-0 top-0 z-100 flex h-screen w-75 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex h-18 shrink-0 items-center justify-between border-b border-slate-100 px-4">
                    <Logo />
                    <button onClick={() => setMobileOpen(false)} className="flex cursor-pointer h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-red-50 hover:text-red-500">
                        <FiX size={23} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <NavItems />
                    <div className="my-4 border-t border-slate-100" />
                    <MobileCart setMobileOpen={setMobileOpen} />
                    <div className="my-4 border-t border-slate-100" />
                    <MobileUser logout={logout} isLoading={isLoading} user={user} setMobileOpen={setMobileOpen} />
                </div>
            </aside>
        </div>
    )
}

export default Navbar;