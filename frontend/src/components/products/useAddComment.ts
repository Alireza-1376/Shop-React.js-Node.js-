import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { addComment } from "../../services/commentServices";

export function useAddcomment() {
    const queryClient = useQueryClient();
    const { isPending, mutateAsync } = useMutation({
        mutationFn: addComment,
        onSuccess: (data) => {
            toast.success(data.data.message)
            queryClient.invalidateQueries({
                queryKey: ["productComment"]
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

    return { isPending, mutateAsync }
}