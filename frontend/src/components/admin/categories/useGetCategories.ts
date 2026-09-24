import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../services/categoryServices";

export function useGetCategories() {
    const { isLoading, data } = useQuery({
        queryFn: getAllCategories,
        queryKey: ["categories"]
    })
    
    return { isLoading, data }
}