import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../../../services/categoryServices";
import toast from "react-hot-toast";
import axios from "axios";

export function useAddCategory() {
    const queryClient = useQueryClient();
    const { isPending, mutateAsync } = useMutation({
        mutationFn: addCategory,
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

    return { isPending, mutateAsync }
}