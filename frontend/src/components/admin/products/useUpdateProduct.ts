import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { updateProduct } from "../../../services/productServices";

export function useUpdateProduct() {
    const queryClient = useQueryClient();
    const { isPending: isUpdating, mutateAsync: update } = useMutation({
        mutationFn: updateProduct,
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
    });

    return { isUpdating, update }
}