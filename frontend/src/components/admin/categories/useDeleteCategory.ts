import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../../services/categoryServices";
import toast from "react-hot-toast";
import axios from "axios";

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    const { isPending, mutateAsync } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: (data) => {
            toast.success(data.data.message)
            queryClient.invalidateQueries({ queryKey: ["categories"] })
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