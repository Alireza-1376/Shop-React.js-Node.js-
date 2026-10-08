import type { UserItems } from "./auth";

export type AddressType = {
    address: string
}

export interface OrderItem {
    product: string;
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