import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

function NotFound() {
    return (
        <main className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-5">
            <section className="text-center">
                <h1 className="text-8xl font-black tracking-tight text-slate-500 sm:text-9xl">
                    404
                </h1>

                <p className="mt-4 text-sm text-slate-500 sm:text-base">
                    صفحه مورد نظر شما وجود ندارد.
                </p>

                <Link
                    to="/"
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                >
                    <FiHome className="h-4 w-4" />
                    بازگشت به خانه
                </Link>
            </section>
        </main>
    );
}

export default NotFound;