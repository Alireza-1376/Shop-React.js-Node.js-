import type { InitialValueType, Products } from "../types/product";
import http from "./httpService";

export function getProducts() {
    return http.get<Products>("/product/list").then((data) => data.data)
}

export function addProduct(data: InitialValueType) {
    return http.post("/product/add", data)
}

export function updateProduct({ id, data }: { id: string, data: InitialValueType }) {
    return http.put(`/product/update/${id}`, data)
}

export function deleteProduct(id:string){
    return http.delete(`/product/delete/${id}`)
}