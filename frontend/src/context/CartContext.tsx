import { createContext, useEffect, useState } from "react";
import type { CartItem } from "../types/cart";

type CartContextType = {
    cart: CartItem[],
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
    addToLocalCart: (productId: string) => void
}

export const CartContext = createContext({} as CartContextType);

function CartProvider({ children }: { children: React.ReactElement }) {
    const [cart, setCart] = useState<CartItem[]>([]);


    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(cart)
    }, [])

    function addToLocalCart(productId: string) {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingItem = cart.find(
            (item: CartItem) => item.product === productId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                product: productId,
                quantity: 1,
            });
        }

        setCart(cart)

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    return <CartContext.Provider value={{ cart, setCart, addToLocalCart }}>{children}</CartContext.Provider>
}

export default CartProvider;