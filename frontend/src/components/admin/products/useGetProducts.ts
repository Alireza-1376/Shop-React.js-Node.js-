import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/productServices";

export function useGetProducts() {
    const { isLoading, data: products } = useQuery({
        queryFn: getProducts,
        queryKey: ["products"]
    })

    return { isLoading, products }
}