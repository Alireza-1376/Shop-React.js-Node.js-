import {
    FiArrowRight,
    FiCalendar,
    FiEdit3,
    FiMail,
    FiPhone,
    FiShield,
    FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import Loading from "../../ui/Loading";
import toPersianNumber from "../../utils/toPersianNumber";
import Modal from "../../ui/Modal";
import { useState } from "react";
import toLocalDateShort from "../../utils/toLocalDateShort";
import EditProfileForm from "./EditProfileForm";

function Profile() {
    const [editProfile, setEditProfile] = useState(false);
    const { isLoading, user } = useUser();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <Loading size={45} />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                <div className="flex flex-col items-center rounded-3xl px-8 py-10 text-center">
                    <p className="font-bold text-slate-500">
                        کاربری یافت نشد ، لطفا وارد شوید.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
                    >
                        <FiArrowRight size={17} />
                        بازگشت
                    </button>
                </div>
            </div>
        );
    }

    const profileItems = [
        {
            title: "نام کاربری",
            value: user.username,
            icon: FiUser,
        },
        {
            title: "ایمیل",
            value: user.email,
            icon: FiMail,
            direction: "ltr" as const,
        },
        {
            title: "شماره موبایل",
            value: toPersianNumber(user.mobile),
            icon: FiPhone,
        },
        {
            title: "نقش کاربر",
            value: user.role === "admin" ? "مدیر" : "کاربر",
            icon: FiShield,
        },
        {
            title: "تاریخ ثبت نام",
            value: toLocalDateShort(user.createdAt),
            icon: FiCalendar,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 px-4 pb-12 pt-32 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                {/* Profile */}
                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
                    {/* Header */}
                    <div className="relative overflow-hidden bg-linear-to-l from-emerald-500 to-emerald-400 px-6 py-9 sm:px-10 sm:py-11">
                        <div className="absolute -left-10 -top-16 h-40 w-40 rounded-full bg-white/10" />
                        <div className="absolute -bottom-24 right-10 h-48 w-48 rounded-full bg-white/10" />

                        <div className="relative flex flex-col items-center text-center">
                            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white text-2xl font-black text-emerald-500 shadow-lg shadow-emerald-900/10 sm:h-24 sm:w-24 sm:text-3xl">
                                <img
                                    className="h-full w-full object-cover"
                                    src="/images/user.jpg"
                                    alt="پروفایل کاربر"
                                />
                            </div>

                            <h1 className="mt-4 text-xl font-black text-white sm:text-2xl">
                                {user.username}
                            </h1>

                            <p className="mt-1 text-sm text-emerald-50">
                                اطلاعات حساب کاربری
                            </p>
                        </div>
                    </div>

                    {/* Information */}
                    <div className="p-5 sm:p-8">
                        <div className="mb-5">
                            <h2 className="text-base font-black text-slate-800 sm:text-lg">
                                اطلاعات پروفایل
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                اطلاعات حساب کاربری شما در این بخش نمایش داده می‌شود.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {profileItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-colors hover:border-emerald-100 hover:bg-emerald-50/40"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-500 shadow-sm">
                                                <Icon size={18} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-medium text-slate-400">
                                                    {item.title}
                                                </p>

                                                <p
                                                    dir={item.direction}
                                                    className="mt-1 truncate text-sm font-bold text-slate-700 sm:text-[15px]"
                                                >
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => setEditProfile(true)}
                                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/15"
                            >
                                <FiEdit3 size={18} />
                                ویرایش پروفایل
                            </button>

                            <Modal
                                title="ویرایش پروفایل"
                                isOpen={editProfile}
                                onClose={() => {
                                    setEditProfile(false);
                                }}
                            >
                                <EditProfileForm
                                    user={user}
                                    setEditProfile={setEditProfile}
                                />
                            </Modal>

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                            >
                                <FiArrowRight size={18} />
                                بازگشت
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
