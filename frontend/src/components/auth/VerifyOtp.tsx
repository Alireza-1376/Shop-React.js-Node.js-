import { useEffect, useState } from "react";
import { FiArrowRight, FiClock, FiMessageSquare } from "react-icons/fi";
import OtpInput from "react-otp-input";
import { useVerifyOtp } from "./useVerifyOtp";
import Loading from "../../ui/Loading";
import { useNavigate } from "react-router-dom";

function VerifyOtp({ setStep, mobile, onSubmit }: {
    setStep: React.Dispatch<React.SetStateAction<number>>,
    mobile: string,
    onSubmit: (values: { mobile: string }) => Promise<void>;
}) {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(120);
    const { isPending, mutateAsync } = useVerifyOtp()

    useEffect(() => {
        if (timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        await mutateAsync({ mobile, otp }, {
            onSuccess: (data) => {
                if (data.data.user.isProfileCompleted) {
                    navigate("/", { replace: true })
                } else {
                    navigate("/complete-profile", { replace: true })
                }
            }
        })

    };

    const handleResend = () => {
        onSubmit({mobile})
        setOtp("");
        setTimeLeft(120);
    };

    return (
        <main className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-5 py-10">
            <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-500">
                        <FiMessageSquare className="h-6 w-6" />
                    </div>

                    <h1 className="text-2xl font-black text-slate-800">
                        تایید شماره موبایل
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        کد ۶ رقمی ارسال شده به شماره موبایل خود را وارد کنید.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div dir="ltr" className="flex justify-center">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            shouldAutoFocus
                            inputType="tel"
                            renderSeparator={<span className="w-2 sm:w-3" />}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    className="h-12! w-10! rounded-xl border border-slate-200 bg-slate-50 text-center text-lg font-bold text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 sm:h-14! sm:w-12! sm:text-xl"
                                />
                            )}
                        />
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                        <FiClock className="h-4 w-4 text-emerald-500" />

                        {timeLeft > 0 ? (
                            <span>
                                زمان باقی‌مانده:{" "}
                                <span className="font-bold text-emerald-500" dir="ltr">
                                    {String(minutes).padStart(2, "0")}:
                                    {String(seconds).padStart(2, "0")}
                                </span>
                            </span>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResend}
                                className="font-bold cursor-pointer text-emerald-500 transition hover:text-emerald-600"
                            >
                                ارسال مجدد کد
                            </button>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={otp.length !== 6}
                        className="mt-7 cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/15 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                    >
                        {isPending ? <Loading size={20} /> : <span className="flex items-center gap-2">
                            تایید و ادامه
                            <FiArrowRight className="h-4 w-4" />
                        </span>}
                    </button>
                </form>

                <button
                    onClick={() => { setStep(1) }}
                    className="mt-5 flex w-full cursor-pointer items-center justify-center text-sm font-medium text-slate-400 transition hover:text-emerald-500"
                >
                    تغییر شماره موبایل
                </button>
            </section>
        </main>
    );
}

export default VerifyOtp;