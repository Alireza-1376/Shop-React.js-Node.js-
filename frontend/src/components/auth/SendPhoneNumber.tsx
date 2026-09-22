import { Form, Formik } from "formik";
import { FiArrowLeft, FiPhone } from "react-icons/fi";
import * as Yup from 'yup';
import Error from "../../ui/Error";
import Input from "../../ui/Input";
import Loading from "../../ui/Loading";

function SendPhoneNumber({ onSubmit, isPending }:
    {
        onSubmit: (values: { mobile: string }) => Promise<void>;
        isPending: boolean
    }) {

    const initialValue = {
        mobile: ""
    }

    const validationSchema = Yup.object({
        mobile: Yup.string().required("لطفا شماره موبایل خود را وارد کنید").matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    })

    return (
        <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <main className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-5 py-10">
                <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-7 text-center">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-500">
                            <FiPhone className="h-6 w-6" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-800">
                            ورود به حساب کاربری
                        </h1>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            شماره موبایل خود را وارد کنید تا وارد حساب کاربری شوید.
                        </p>
                    </div>

                    <Form className="space-y-5">
                        <div>
                            <label htmlFor="phone" className="mb-2 block text-sm font-bold text-slate-700">
                                شماره موبایل
                            </label>
                            <Input
                                name="mobile"
                                id="phone"
                                placeholder="09121234567"
                                style="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-center text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                            />
                            <Error name="mobile" />
                        </div>

                        <button
                            type="submit"
                            className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/15 transition hover:bg-emerald-600"
                        >
                            {isPending ? <Loading size={20} /> : <span className="flex items-center gap-2">
                                ورود
                                <FiArrowLeft className="h-4 w-4" />
                            </span>}

                        </button>
                    </Form>
                </section>
            </main>
        </Formik>
    )
}

export default SendPhoneNumber;