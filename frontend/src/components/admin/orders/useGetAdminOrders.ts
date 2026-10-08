import { useQuery } from "@tanstack/react-query";
import { getAdminOrders } from "../../../services/orderServices";
import { useLocation } from "react-router-dom";

export function useGetOrders() {
    const location = useLocation();
    const params = Object.fromEntries(new URLSearchParams(location.search));

    const { isLoading, data: orders } = useQuery({
        queryFn: () => getAdminOrders(location.search),
        queryKey: ["admin-orders", params]
    })

    return { isLoading, orders }
}