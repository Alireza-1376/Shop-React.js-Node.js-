function Home() {
    return (
        <main>
            <section id="home" className="flex min-h-162.5 items-center justify-center px-6">
                <div className="text-center">
                    <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-600">به فروشگاه علیرضا خوش آمدید</span>
                    <h2 className="mt-5 text-4xl font-black leading-tight text-slate-800 sm:text-5xl">خریدی آسان، سریع و مطمئن</h2>
                    <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-500">بهترین محصولات را با کیفیت بالا و قیمت مناسب از فروشگاه ما تهیه کنید.</p>
                    <a href="#products" className="mt-8 inline-flex rounded-xl bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600">مشاهده محصولات</a>
                </div>
            </section>
        </main>
    )
}

export default Home;