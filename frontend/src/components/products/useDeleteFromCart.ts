import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../../services/cartServices";
import toast from "react-hot-toast";
import axios from "axios";

export function useDeleteFromCart() {
    const queryClient = useQueryClient();
    const { isPending, mutateAsync:deleteFromCart} = useMutation({
        mutationFn: deleteItem,
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

    return { isPending, deleteFromCart}
}