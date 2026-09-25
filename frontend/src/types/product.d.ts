export type ProductType = {
    _id: string
    title: string
    description: string
    price: number
    stock: number
    image: string[]
    discount: number
    likes: string[]
    category: string
}

export type Products = {
    products: ProductType[]
    totalPages: number
    totalProducts: number
    currentPage: number
}