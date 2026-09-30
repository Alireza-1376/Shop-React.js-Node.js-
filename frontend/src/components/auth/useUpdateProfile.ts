import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../services/authServices";
import toast from "react-hot-toast";
import axios from "axios";

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const { isPending, mutateAsync } = useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            toast.success(data.data.message)
            queryClient.invalidateQueries({
                queryKey: ["user"]
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



    return { isPending, mutateAsync } ;
}