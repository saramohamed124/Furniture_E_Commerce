'use client'

import { create } from "zustand";
import { persist } from "zustand/middleware";

// First Step => To Create New Store
export const useCartStore = create(
    // Using persist to ensure products not lose if user exist browser
    persist(
        // set and get to handle cart in first and get products info (ex: in nav) and edit on it (ex: remove)
        (set, get) => ({
            // Intial cart by empty array in the first
            cart:[],
            // Handle add products to cart
            addToCart: (product) => {
                const currentCart = get().cart;
                const exitistingItems = currentCart.find(item => item.id === product?.id);
                if(exitistingItems) {
                    const updateCartItems = currentCart.map((item) =>
                        item.id === product?.id ? {...item, qty: item.qty + 1 } : item
                    );
                    set({ cart: updateCartItems });
                } else {
                    set({ cart: [...currentCart, {...product, qty: 1}]});
                }
            },
            getTotalPrice: () => {
                return get().cart.reduce((total, item) => total + item.price * item.qty , 0)
            },
            getTotalProducts: () => {
                return get().cart.reduce((total, item) => total + item.qty, 0)
            },
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: 'cart-storage',
        }
    )
) 