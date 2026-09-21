import { useState } from "react"
import SendPhoneNumber from "./SendPhoneNumber"
import VerifyOtp from "./VerifyOtp"
import CompleteProfile from "./CompleteProfile";

function AuthLayout() {
    const [step, setStep] = useState(1);

    return (
        <div>
            {step == 1 && <SendPhoneNumber />}
            {step == 2 && <VerifyOtp />}
            {step == 3 && <CompleteProfile />}
        </div>
    )
}

export default AuthLayout;