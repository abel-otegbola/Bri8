import { storeContext } from "@/context/useStore";
import { currencyFormatter } from "@/helpers/currencyFormatter";
import { IProduct } from "@/interface/store";
import { Heart, ShoppingCartSimple } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext } from "react";

export default function ProductCard({ product }: { product: IProduct }) {
    const { wishlist, addToWishlist, removeFromWishlist, cart, addToCart, removeFromCart } = useContext(storeContext)

    return (
        <div className={`flex flex-col bg-white dark:bg-[#000]/[0.1] relative break-inside-avoid md:mb-4 mb-2 pb-4 `} data-aos="fade-up">
                <Link href={`/product?id=${product.id}`} className="block rounded-[10px] sm:h-[250px] h-[250px] bg-gray-500/[0.1] bg-cover bg-center" style={{backgroundImage: `url("${product?.images[0]}")`}} >
                </Link>
                <div className="absolute top-3 right-3 cursor-pointer z-[2]">
                    {
                        wishlist.indexOf(product.id) === -1 ? 
                        <Heart className="text-[20px] text-gray-700/[0.3]" onClick={() => addToWishlist(product.id)} /> 
                        : 
                        <Heart weight="fill" className="text-[20px] text-red-500"  onClick={() => removeFromWishlist(product.id)} />
                    }
                </div>
                
                <p className="text-[10px] opacity-[0.5] uppercase font-bold px-3 py-0 my-2">{product?.category}</p>
                <a href={`/product?id=${product.id}`} className="block pb-4 px-3 leading-[130%] text-[12px] uppercase font-semibold">{product?.title}</a>
                <p className="flex flex-wrap gap-3 justify-between items-center text-[16px] opacity-[0.7] px-3">
                    {currencyFormatter(+product?.price * 1700)} 

                    <div className="border border-gray-500/[0.1] rounded-full p-2 cursor-pointer z-[2]">
                    {
                        cart.map(item => item.id).indexOf(product.id) === -1 ? 
                        <ShoppingCartSimple className="text-[20px] text-gray-700/[0.3]" onClick={() => addToCart({id: product.id, quantity: 1, variation: { color: "black", size: "LG" }})} /> 
                        : 
                        <ShoppingCartSimple weight="fill" className="text-[20px] text-primary"  onClick={() => removeFromCart(product.id)} />
                    }
                    </div>
                </p>
        </div>
    )
}