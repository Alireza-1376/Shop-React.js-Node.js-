import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { logout } from "../services/authServices";


export function useLogout() {
    const queryClient = useQueryClient()
    const { mutateAsync } = useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            toast.success(data.data.message)
            queryClient.removeQueries()
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