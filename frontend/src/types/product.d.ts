import type { CategoryType } from "./category"

export type ProductType = {
    _id: string
    title: string
    description: string
    price: number
    stock: number
    image: string[]
    discount: number
    likes: string[]
    category: CategoryType
}

export type Products = {
    products: ProductType[]
    totalPages: number
    totalProducts: number
    currentPage: number
}

export type InitialValueType = {
    title: string;
    description: string;
    price: string;
    stock: string;
    discount: string;
    category: string;
};