import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../../services/orderServices";

export function useGetOrder() {
    
    const { isLoading, data: orders } = useQuery({
        queryFn: getUserOrders,
        queryKey: ["users-orders"]
    })

    return { isLoading, orders }
}