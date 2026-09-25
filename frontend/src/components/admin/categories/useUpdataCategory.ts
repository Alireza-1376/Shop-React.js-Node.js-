import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { updateCategory } from "../../../services/categoryServices";

export function useUpdateCategory() {
    const queryClient = useQueryClient();
    const { isPending : isUpdating , mutateAsync : update } = useMutation({
        mutationFn: updateCategory,
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
    });

    return { isUpdating, update }
}