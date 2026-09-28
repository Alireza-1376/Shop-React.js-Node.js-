import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../services/authServices";
import { useLocation } from "react-router-dom";

export function useGetUsers() {
    const location = useLocation();
    const params = Object.fromEntries(new URLSearchParams(location.search));

    const { isLoading, data: users } = useQuery({
        queryFn: () => getAllUsers(location.search),
        queryKey: ["users", params]
    })

    return { isLoading, users }
}