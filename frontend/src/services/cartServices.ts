import type { CartItem } from "../types/cart";
import http from "./httpService";

export function addToCart(id: string) {
    return http.post(`/cart/add/${id}`)
}

export function mergeCart(data: CartItem[]) {
    return http.post("/cart/merge", { cart: data })
}

export function deleteItem(id: string) {
    return http.delete(`/cart/delete/${id}`)
}

export function deleteAllItems(id: string) {
    return http.delete(`/cart/delete-all/${id}`)
}