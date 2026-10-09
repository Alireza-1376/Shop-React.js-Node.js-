import type { AddressType, Order, Orders } from "../types/order";
import http from "./httpService";

export function checkout(data: AddressType) {
    return http.post("/order/checkout", data)
}

export function getUserOrders() {
    return http.get<Order[]>("/order/users-orders-list").then((data) => data.data)
}

export function getAdminOrders(qs: string) {
    return http.get<Orders>(`/order/admin-orders-list${qs}`).then((data) => data.data)
}

export function changeStatus({ id, data }: { id: string, data: { status: string } }) {
    return http.put(`/order/change-status/${id}`, data)
}