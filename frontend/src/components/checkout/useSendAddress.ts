import { useMutation } from "@tanstack/react-query";
import { checkout } from "../../services/orderServices";
import axios from "axios";
import toast from "react-hot-toast";

export function useSendAddress() {
    const { isPending, mutateAsync } = useMutation({
        mutationFn: checkout,
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message || "اطلاعات وارد شده صحیح نیست"
                );
            }
        }
    })

    return { isPending, mutateAsync }
}