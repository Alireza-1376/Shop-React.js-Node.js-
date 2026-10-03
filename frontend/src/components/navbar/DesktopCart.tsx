import { FiShoppingCart } from "react-icons/fi"
import type { UserItems } from "../../types/auth";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function DesktopCart({ user }: { user: UserItems }) {
    const { cart } = useContext(CartContext);
    
    return (
        <a href="#cart" aria-label="سبد خرید" className="relative flex h-11 w-11 items-center justify-center rounded-xl text-slate-700 transition-all hover:bg-emerald-50 hover:text-emerald-600">
            <FiShoppingCart size={23} />
            {user && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.75 min-w-4.75 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                    {user?.cart.length}
                </span>
            )}
            {!user &&
                <span className="absolute -right-0.5 -top-0.5 flex h-4.75 min-w-4.75 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                    {cart.length}
                </span>
            }

        </a>
    )
}

export default DesktopCart;