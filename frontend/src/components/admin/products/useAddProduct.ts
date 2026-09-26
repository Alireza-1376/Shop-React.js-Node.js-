import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { addProduct } from "../../../services/productServices";

export function useAddCategory() {
    const queryClient = useQueryClient();
    const { isPending: isAdd, mutateAsync: add } = useMutation({
        mutationFn: addProduct,
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

    return { isAdd, add }
}