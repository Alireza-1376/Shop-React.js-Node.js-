import { useState } from "react";
import { FiArrowLeft, FiMail, FiUser } from "react-icons/fi";

function CompleteProfile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log({
            username,
            email,
        });
    };

    return (
        <main className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-5 py-10">
            <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-500">
                        <FiUser className="h-6 w-6" />
                    </div>

                    <h1 className="text-2xl font-black text-slate-800">
                        تکمیل پروفایل
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        برای تکمیل حساب کاربری، اطلاعات زیر را وارد کنید.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm font-bold text-slate-700"
                        >
                            نام کاربری
                        </label>

                        <div className="relative">
                            <FiUser className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="نام کاربری خود را وارد کنید"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-bold text-slate-700"
                        >
                            ایمیل
                        </label>

                        <div className="relative">
                            <FiMail className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                                id="email"
                                type="email"
                                dir="ltr"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="example@email.com"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!username.trim() || !email.trim()}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/15 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                    >
                        تکمیل پروفایل
                        <FiArrowLeft className="h-4 w-4" />
                    </button>
                </form>
            </section>
        </main>
    );
}

export default CompleteProfile;