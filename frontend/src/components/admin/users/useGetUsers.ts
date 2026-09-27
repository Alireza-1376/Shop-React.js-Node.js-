import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../services/authServices";

export function useGetUsers() {
    const { isLoading, data: users } = useQuery({
        queryFn: getAllUsers,
        queryKey: ["users"]
    })

    return { isLoading, users }
}