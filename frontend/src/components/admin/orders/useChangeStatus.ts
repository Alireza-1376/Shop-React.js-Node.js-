import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeStatus } from "../../../services/orderServices";
import toast from "react-hot-toast";
import axios from "axios";

export function useChangeStatus() {
    const queryClient = useQueryClient();
    const { isPending, mutateAsync } = useMutation({
        mutationFn: changeStatus,
        onSuccess: (data) => {
            toast.success(data.data.message)
            queryClient.invalidateQueries({ queryKey: ["admin-orders"] })
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