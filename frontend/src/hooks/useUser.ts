import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/authServices";

export function useUser() {
    const { isLoading, data: user } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: false,
        refetchOnWindowFocus: false,
    })


    return { isLoading, user }
}