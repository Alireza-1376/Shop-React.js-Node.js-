import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/authServices";

export function useUser() {
    const { isLoading, data: user } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: false
    })

    
    return { isLoading, user }
}