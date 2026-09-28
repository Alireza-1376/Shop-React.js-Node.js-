import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

function ContactUs() {
    return (
        <div className="min-h-screen bg-slate-50 py-10 sm:py-14">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <span className="mb-3 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-600">
                        تماس با ما
                    </span>

                    <h1 className="text-2xl font-black text-slate-800 sm:text-3xl">
                        با ما در ارتباط باشید
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">
                        اگر سوالی دارید یا به راهنمایی نیاز دارید، خوشحال می‌شویم
                        با ما در ارتباط باشید.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                        <h2 className="mb-6 text-lg font-black text-slate-800">
                            اطلاعات تماس
                        </h2>

                        <div className="space-y-4">
                            <a
                                href="tel:09100000000"
                                className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 transition-colors hover:bg-emerald-50"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                                    <FiPhone size={18} />
                                </div>

                                <div>
                                    <p className="mb-1 text-[11px] text-slate-400">
                                        شماره تماس
                                    </p>

                                    <p className="text-sm font-bold text-slate-700">
                                        ۰۹۱۰۰۰۰۰۰۰۰
                                    </p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                                    <FiMail size={18} />
                                </div>

                                <div>
                                    <p className="mb-1 text-[11px] text-slate-400">
                                        ایمیل
                                    </p>

                                    <p className="text-sm font-bold text-slate-700">
                                        info@example.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                                    <FiMapPin size={18} />
                                </div>

                                <div>
                                    <p className="mb-1 text-[11px] text-slate-400">
                                        آدرس
                                    </p>

                                    <p className="text-sm font-bold text-slate-700">
                                        تهران، ایران
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                        <h2 className="mb-6 text-lg font-black text-slate-800">
                            پیام خود را ارسال کنید
                        </h2>

                        <form className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-xs font-bold text-slate-600"
                                >
                                    نام و نام خانوادگی
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="نام خود را وارد کنید"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-50"
                                />
                            </div>

                            <div>
                                <label
                                dir="rtl"
                                    htmlFor="phone"
                                    className="mb-2 block text-xs font-bold text-slate-600"
                                >
                                    شماره تلفن
                                </label>

                                <input
                                dir="rtl"
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    inputMode="numeric"
                                    placeholder="مثلاً ۰۹۱۲۱۲۳۴۵۶۷"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-50"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-xs font-bold text-slate-600"
                                >
                                    ایمیل
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="ایمیل خود را وارد کنید"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-50"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-xs font-bold text-slate-600"
                                >
                                    پیام
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    placeholder="پیام خود را بنویسید..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-50"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
                            >
                                ارسال پیام
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
