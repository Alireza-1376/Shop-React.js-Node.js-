import type { AddressType, Order } from "../types/order";
import http from "./httpService";

export function checkout(data: AddressType) {
    return http.post("/order/checkout", data)
}

export function getUserOrders() {
    return http.get<Order[]>("/order/users-orders-list").then((data) => data.data)
}

export function getAdminOrders(qs: string) {
    return http.get<Order[]>(`/order/admin-orders-list${qs}`).then((data) => data.data)
}