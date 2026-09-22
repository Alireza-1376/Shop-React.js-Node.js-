import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { verifyOtp } from "../../services/authServices";

export function useVerifyOtp() {
    const { isPending, mutateAsync, data } = useMutation({
        mutationFn: verifyOtp,
        onSuccess: (data) => {
            toast.success(data.data.message)
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message || "اطلاعات وارد شده صحیح نیست"
                );
            }
        }
    })

    return { isPending, mutateAsync, data }
}