import type { Products } from "../types/product";
import http from "./httpService";

export function getProducts() {
    return http.get<Products>("/product/list").then((data) => data.data)
}