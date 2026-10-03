import type { CartItem } from "../types/cart";
import http from "./httpService";

export function addToCart(id: string) {
    return http.post(`/cart/add/${id}`)
}

export function mergeCart(data: CartItem[]) {
    return http.post("/cart/merge", {cart : data})
}