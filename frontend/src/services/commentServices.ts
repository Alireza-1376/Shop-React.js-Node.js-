import type { AddCommentPayload, CommentType } from "../types/comment";
import http from "./httpService";

export function addComment(data: AddCommentPayload) {
    return http.post("/comment/add", data)
}

export function getProductComments(id: string) {
    return http.get<CommentType[]>(`/comment/product-comment/${id}`).then((data) => data.data)
}