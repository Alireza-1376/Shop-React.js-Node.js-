import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mergeCart } from "../services/cartServices";
import toast from "react-hot-toast";
import axios from "axios";

export function useMergeCart() {
    const queryClient = useQueryClient()
    const { isPending, mutateAsync:merge } = useMutation({
        mutationFn: mergeCart,
        onSuccess: (data) => {
            toast.success(data.data.message);
            queryClient.invalidateQueries({
                queryKey: ["user"]
            });
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message || "اطلاعات وارد شده صحیح نیست"
                );
            }
        }
    })

    return { isPending, merge }
}