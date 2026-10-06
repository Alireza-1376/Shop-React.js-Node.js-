import type { AddressType } from "../types/order";
import http from "./httpService";

export function checkout(data: AddressType) {
    return http.post("/order/checkout", data)
}