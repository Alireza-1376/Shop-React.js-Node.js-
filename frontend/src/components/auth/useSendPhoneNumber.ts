import { useMutation } from "@tanstack/react-query";
import { sendPhoneNumber } from "../../services/authServices";
import toast from "react-hot-toast";
import axios from "axios";

export function useSendPhoneNumber() {
    const { isPending, mutateAsync, data } = useMutation({
        mutationFn: sendPhoneNumber,
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