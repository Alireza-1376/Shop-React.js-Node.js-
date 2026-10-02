import { useQuery } from "@tanstack/react-query";
import { getProductComments } from "../../services/commentServices";
import { useParams } from "react-router-dom";

export function useGetProductComments() {
    const { id } = useParams();
    const { isLoading, data } = useQuery({
        queryFn: () => getProductComments(String(id)),
        queryKey: ["productComment" , id]
    })

    return { isLoading, data }
}