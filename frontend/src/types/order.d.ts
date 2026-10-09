import type { UserItems } from "./auth";
import type { ProductType } from "./product";

export type AddressType = {
    address: string
}

export interface OrderItem {
    product: ProductType;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    _id: string;
    user: UserItems;
    items: OrderItem[];
    address: string;
    totalPrice: number;
    status: "pending" | "shipped" | "delivered";
    paymentStatus: "pending" | "paid" | "failed";
    authority: string | null;
    transactionId: string | null;
    stockRestored: boolean;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
}

export type Orders = {
    orders: Order[]
    totalPages: number
    totalOrders: number
    currentPage: number
}