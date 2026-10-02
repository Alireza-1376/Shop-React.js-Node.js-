import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeProduct } from "../../services/productServices";
import toast from "react-hot-toast";
import axios from "axios";

export function useLikeProduct() {
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn: likeProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
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

    return { mutateAsync }
}