import type { ProductType } from "./product";

export type CartItem = {
    product: ProductType;
    quantity: number;
};