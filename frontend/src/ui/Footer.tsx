import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="border-t border-slate-300 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="text-center sm:text-right">
                        <h2 className="text-lg font-black text-emerald-600">
                            فروشگاه علیرضا
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">
                            خریدی ساده، مطمئن و لذت‌بخش
                        </p>
                    </div>

                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-500">
                        <Link to="/" className="transition-colors hover:text-emerald-500">
                            خانه
                        </Link>
                        <Link to="/products" className="transition-colors hover:text-emerald-500">
                            محصولات
                        </Link>
                        <Link to="/about-us" className="transition-colors hover:text-emerald-500">
                            درباره ما
                        </Link>
                        <Link to="/contact-us" className="transition-colors hover:text-emerald-500">
                            تماس با ما
                        </Link>
                    </nav>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-sm text-slate-400 sm:flex-row">
                    <p>© ۱۴۰۵ تمامی حقوق محفوظ است.</p>

                    <p className="flex items-center gap-1.5">
                        ساخته شده با
                        <FiHeart size={14} className="text-emerald-500" />
                        برای شما
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
