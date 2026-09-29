import { useState } from "react"
import SendPhoneNumber from "./SendPhoneNumber"
import VerifyOtp from "./VerifyOtp"
import { useSendPhoneNumber } from "./useSendPhoneNumber";
import { useLocation, useNavigate } from "react-router-dom";

function AuthLayout() {
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate()
    const { isPending, mutateAsync, data } = useSendPhoneNumber()

    const onSubmit = async (values: { mobile: string }) => {
        await mutateAsync(values)
        if (pathname != "/check-otp") {
            navigate("/check-otp")
        }
    }
    return (
        <div>
            {pathname == "/login" && <SendPhoneNumber onSubmit={onSubmit} isPending={isPending} />}
            {pathname == "/check-otp" && <VerifyOtp onSubmit={onSubmit} mobile={data?.data.mobile} />}
        </div>
    )
}

export default AuthLayout;