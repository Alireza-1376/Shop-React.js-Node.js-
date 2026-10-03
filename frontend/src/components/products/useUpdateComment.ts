import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../../services/commentServices";
import toast from "react-hot-toast";
import axios from "axios";

export function useUpdateComment() {
    const queryClient = useQueryClient();
    const { isPending: isUpdating, mutateAsync: updating } = useMutation({
        mutationFn: updateComment ,
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

    return { isUpdating, updating }
}