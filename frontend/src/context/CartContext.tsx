import { createContext, useEffect, useState } from "react";
import type { CartItem } from "../types/cart";
import type { ProductType } from "../types/product";

type CartContextType = {
    cart: CartItem[],
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
    addToLocalCart: (product: ProductType) => void
    decreaseFromLocalCart: (product: ProductType) => void
    removeFromLocalCart: (product: ProductType) => void;
}

export const CartContext = createContext({} as CartContextType);

function CartProvider({ children }: { children: React.ReactElement }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(cart)
    }, [])

    function addToLocalCart(product: ProductType) {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingItem = cart.find(
            (item: CartItem) => item.product._id === product._id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                product: product,
                quantity: 1,
            });
        }

        setCart(cart)

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function decreaseFromLocalCart(product: ProductType) {
        const existingItem = cart.find(
            (item) => item.product._id === product._id
        );

        if (!existingItem) return;

        let newCart: CartItem[];

        if (existingItem.quantity > 1) {
            newCart = cart.map((item) =>
                item.product._id === product._id
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                    }
                    : item
            );
        } else {
            newCart = cart.filter(
                (item) => item.product._id !== product._id
            );
        }

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    function removeFromLocalCart(product: ProductType) {
        const newCart = cart.filter(
            (item) => item.product._id !== product._id
        );

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    return <CartContext.Provider value={{ cart, setCart, addToLocalCart, decreaseFromLocalCart, removeFromLocalCart }}>{children}</CartContext.Provider>
}

export default CartProvider;