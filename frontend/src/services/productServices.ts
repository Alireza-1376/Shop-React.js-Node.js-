import type { InitialValueType, Products, ProductType } from "../types/product";
import http from "./httpService";

export function getProducts(qs: string) {
    return http.get<Products>(`/product/list${qs}`).then((data) => data.data)
}

export function addProduct(data: InitialValueType) {
    return http.post("/product/add", data)
}

export function updateProduct({ id, data }: { id: string, data: InitialValueType }) {
    return http.put(`/product/update/${id}`, data)
}

export function deleteProduct(id: string) {
    return http.delete(`/product/delete/${id}`)
}

export function getSingleProduct(id: string) {
    return http.get<{ product: ProductType }>(`/product/${id}`).then((data) => data.data)
}

export function addProductImage({ id, data }: { id: string, data: FormData }) {
    return http.post(`/product/add-image/${id}`, data)
}

export function deleteImage({ id, data }: { id: string, data: { imageName: string } }) {
    return http.post(`/product/delete-image/${id}`, data)
}

export function likeProduct(id: string) {
    return http.put(`/product/like/${id}`)
}