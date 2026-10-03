import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../services/commentServices";
import axios from "axios";
import toast from "react-hot-toast";

export function useDeleteComment() {
    const queryClient = useQueryClient();
    const { isPending: isDeleting, mutateAsync: deleting } = useMutation({
        mutationFn: deleteComment,
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


    return { isDeleting, deleting }
}