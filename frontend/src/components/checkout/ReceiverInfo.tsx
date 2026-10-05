import {
    FiPhone,
    FiUser,
} from "react-icons/fi";

import { useUser } from "../../hooks/useUser";
import toPersianNumber from "../../utils/toPersianNumber";

function ReceiverInfo() {
    const { user } = useUser();

    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                    <FiUser
                        size={19}
                        className="text-emerald-500"
                    />
                </div>

                <div>
                    <h2 className="font-semibold text-gray-800">
                        اطلاعات گیرنده
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                        اطلاعات حساب کاربری شما
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm text-gray-600">
                        نام و نام خانوادگی
                    </label>

                    <div className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">
                        <FiUser
                            size={17}
                            className="text-emerald-500"
                        />

                        <span className="text-sm text-gray-700">
                            {user?.username || "ثبت نشده"}
                        </span>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-gray-600">
                        شماره تماس
                    </label>

                    <div className="flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">
                        <FiPhone
                            size={17}
                            className="text-emerald-500"
                        />

                        <span
                            dir="ltr"
                            className="text-sm text-gray-700"
                        >
                            {user?.mobile
                                ? toPersianNumber(user.mobile)
                                : "ثبت نشده"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReceiverInfo;