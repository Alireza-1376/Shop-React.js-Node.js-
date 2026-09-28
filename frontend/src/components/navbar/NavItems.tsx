import { FiHome, FiInfo, FiPhone, FiShoppingBag } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { title: "خانه", href: "/", icon: <FiHome size={18} /> },
    { title: "محصولات", href: "/products", icon: <FiShoppingBag size={18} /> },
    { title: "درباره ما", href: "/about-us", icon: <FiInfo size={18} /> },
    { title: "تماس با ما", href: "/contact-us", icon: <FiPhone size={18} /> },
];

function NavItems() {
    const location = useLocation();
    const path = location.pathname;
    
    return (
        <nav className="items-center gap-1 lg:flex">
            {navItems.map((item) => (
                <Link key={item.title} to={item.href} className={`${item.href==path ? "text-emerald-500" : ""} group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600`}>
                    <span className=" transition-colors group-hover:text-emerald-500">{item.icon}</span>
                    {item.title}
                </Link>
            ))}
        </nav>
    )
}

export default NavItems