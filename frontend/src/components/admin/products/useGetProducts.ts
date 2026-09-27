import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/productServices";
import { useLocation } from "react-router-dom";

export function useGetProducts() {
    const location = useLocation();
    const params = Object.fromEntries(new URLSearchParams(location.search));
    const newParams = { ...params, limit: "4" }
    
    const { isLoading, data: products } = useQuery({
        queryFn:()=> getProducts(location.search),
        queryKey: ["products", newParams]
    })

    return { isLoading, products }
}