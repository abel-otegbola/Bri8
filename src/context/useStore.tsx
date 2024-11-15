'use client'
import { useLocalStorage } from "@/customHooks/useLocaStorage";
import { gadgets } from "@/data/products";
import { ICart, IProduct } from "@/interface/store";
import { createContext, useEffect } from "react";

interface IStoreContext {
    products: IProduct[];
    addProduct: (aug0: IProduct) => void;
    removeProduct: (id: string) => void;
    cart: ICart[];
    addToCart: (aug0: ICart) => void;
    removeFromCart: (id: string) => void;
    changeQuantity: (id: string, action: "ADD" | "MINUS" | number) => void;
    wishlist: string[];
    addToWishlist: (aug0: string) => void;
    removeFromWishlist: (id: string) => void;
}

export const storeContext = createContext<IStoreContext>({} as IStoreContext)

export default function StoreContextProvider({ children }: {children: React.ReactNode}) {
    const [cart, setCart] = useLocalStorage("cart", [])
    const [wishlist, setWishlist] = useLocalStorage("wishlist", [])
    const [products, setProducts] = useLocalStorage("products", gadgets)

    useEffect(() => {

    }, [])

    const addProduct = (data: IProduct) => {
        setProducts({...products, data})
    }

    const removeProduct = (id: string) => {
        setProducts(products.filter((item: IProduct) => item.id !== id))
    }

    const addToCart = (data: ICart) => {
        setCart([...cart, data])
    }

    const removeFromCart = (id: string) => {
        setCart(cart.filter((item: ICart) => item.id !== id))
    }

    const changeQuantity = (id: string, action: "ADD" | "MINUS" | number) => {
        setCart(cart.map((item: ICart) => {
            if(item.id === id) {
                if(action === "ADD") {
                    return { id: item.id, quantity: item.quantity + 1, variation: item.variation }
                }
                else if(action === "MINUS") {
                    return { id: item.id, quantity: item.quantity < 2 ? item.quantity : item.quantity - 1, variation: item.variation }
                }
                else {
                    return { id: item.id, quantity: action, variation: item.variation }
                }
            }
            else return item;
        }))
    }

    const addToWishlist = (data: string) => {
        setWishlist([...wishlist, data])
    }

    const removeFromWishlist = (id: string) => {
        setWishlist(wishlist.filter((item: string) => item !== id))
    }

    const data = {
        products,
        addProduct,
        removeProduct,
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        wishlist,
        addToWishlist,
        removeFromWishlist,
    }

    return (
        <storeContext.Provider value={data} >
            {children}
        </storeContext.Provider>
    )
}