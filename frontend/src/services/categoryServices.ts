import type { CategoryType, InitialValueType } from "../types/category";
import http from "./httpService";

export function getAllCategories() {
    return http
        .get<{ categories: CategoryType[] }>("/category/list")
        .then((response) => response.data.categories)
}

export function addCategory(data: InitialValueType) {
    return http.post("/category/add", data)
}