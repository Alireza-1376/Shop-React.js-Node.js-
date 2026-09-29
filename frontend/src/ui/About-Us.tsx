import { FiHeart, FiShield, FiTruck } from "react-icons/fi";

function AboutUs() {
    return (
        <div className="min-h-screen bg-slate-50 py-10 py-32">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <section className="rounded-3xl border border-slate-100 bg-white px-6 py-12 text-center shadow-sm sm:px-10 sm:py-16">
                    <span className="mb-4 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-600">
                        درباره ما
                    </span>

                    <h1 className="mb-5 text-2xl font-black text-slate-800 sm:text-4xl">
                        خریدی ساده، مطمئن و لذت‌بخش
                    </h1>

                    <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                        ما اینجا هستیم تا تجربه‌ای ساده و مطمئن برای خرید آنلاین
                        فراهم کنیم. تلاش می‌کنیم محصولات باکیفیت را با قیمت مناسب
                        و تجربه‌ای راحت در اختیار شما قرار دهیم.
                    </p>
                </section>

                <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                            <FiHeart size={20} />
                        </div>

                        <h2 className="mb-2 text-sm font-black text-slate-800">
                            رضایت شما
                        </h2>

                        <p className="text-xs leading-6 text-slate-400">
                            رضایت و اعتماد شما برای ما اهمیت زیادی دارد.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                            <FiShield size={20} />
                        </div>

                        <h2 className="mb-2 text-sm font-black text-slate-800">
                            خرید مطمئن
                        </h2>

                        <p className="text-xs leading-6 text-slate-400">
                            تلاش می‌کنیم خریدی امن و قابل اعتماد داشته باشید.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                            <FiTruck size={20} />
                        </div>

                        <h2 className="mb-2 text-sm font-black text-slate-800">
                            ارسال سریع
                        </h2>

                        <p className="text-xs leading-6 text-slate-400">
                            سفارش‌های شما را در سریع‌ترین زمان ممکن ارسال می‌کنیم.
                        </p>
                    </div>
                </section>

                <section className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-6 py-8 text-center">
                    <h2 className="mb-2 text-lg font-black text-slate-800">
                        همراه شما هستیم
                    </h2>

                    <p className="text-sm leading-6 text-slate-500">
                        هدف ما این است که هر بار تجربه بهتری از خرید آنلاین داشته باشید.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default AboutUs;
