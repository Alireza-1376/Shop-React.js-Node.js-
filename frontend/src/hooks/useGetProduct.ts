import { useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "../services/productServices";
import { useParams } from "react-router-dom";

export function useGetProduct() {
    const { id } = useParams();
    const { isLoading, data } = useQuery({
        queryFn: () => getSingleProduct(String(id)),
        queryKey: ["product", id]
    })

    return { isLoading, data }
}