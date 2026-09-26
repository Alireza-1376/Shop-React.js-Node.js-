import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { deleteProduct } from "../../../services/productServices";

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    const { isPending, mutateAsync } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: (data) => {
            toast.success(data.data.message)
            queryClient.invalidateQueries({ queryKey: ["products"] })
        },
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