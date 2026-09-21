import { FiHome, FiInfo, FiPhone, FiShoppingBag } from "react-icons/fi";

const navItems = [
    { title: "خانه", href: "/", icon: <FiHome size={18} /> },
    { title: "محصولات", href: "/products", icon: <FiShoppingBag size={18} /> },
    { title: "درباره ما", href: "/about", icon: <FiInfo size={18} /> },
    { title: "تماس با ما", href: "/contact", icon: <FiPhone size={18} /> },
];

function NavItems() {
    return (
        <nav className="items-center gap-1 lg:flex">
            {navItems.map((item) => (
                <a key={item.title} href={item.href} className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600">
                    <span className="text-slate-400 transition-colors group-hover:text-emerald-500">{item.icon}</span>
                    {item.title}
                </a>
            ))}
        </nav>
    )
}

export default NavItems