import { useState } from "react"
import SendPhoneNumber from "./SendPhoneNumber"
import VerifyOtp from "./VerifyOtp"
import { useSendPhoneNumber } from "./useSendPhoneNumber";

function AuthLayout() {
    const [step, setStep] = useState(1);
    const { isPending, mutateAsync, data } = useSendPhoneNumber()
    
    const onSubmit = async (values: { mobile: string }) => {
        await mutateAsync(values)
        setStep(2)
    }
    return (
        <div>
            {step == 1 && <SendPhoneNumber onSubmit={onSubmit} isPending={isPending} />}
            {step == 2 && <VerifyOtp setStep={setStep} onSubmit={onSubmit} mobile={data?.data.mobile}/>}
        </div>
    )
}

export default AuthLayout;