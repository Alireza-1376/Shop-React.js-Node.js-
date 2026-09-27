import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { deleteImage } from "../../../services/productServices";

export function useDeleteImage() {
    const queryClient = useQueryClient();

    const { isPending, mutateAsync } = useMutation({
        mutationFn: deleteImage,
        onSuccess: (data) => {
            toast.success(data.data.message)
            queryClient.invalidateQueries({ queryKey: ["product"] })
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