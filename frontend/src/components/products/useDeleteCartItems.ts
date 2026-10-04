import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllItems } from "../../services/cartServices";
import toast from "react-hot-toast";
import axios from "axios";

export function useDeleteCartItems() {
    const queryClient = useQueryClient();
    const { isPending, mutateAsync: deleteCartItems } = useMutation({
        mutationFn: deleteAllItems,
        onSuccess: (data) => {
            toast.success(data.data.message)
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

    return { isPending, deleteCartItems }
}