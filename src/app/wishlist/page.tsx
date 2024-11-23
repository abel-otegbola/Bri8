'use client'
import Button from "@/components/button/button";
import ProductCard from "@/components/cards/productCard";
import { storeContext } from "@/context/useStore";
import { IProduct } from "@/interface/store";
import { useContext } from "react";

export default function WishlistPage() {
    const { products, wishlist } = useContext(storeContext)

    return (    
        <div className="flex flex-col gap-6">

            <div className="flex flex-col items-center md:px-[8%] px-6 mt-2 py-12 bg-slate-100 dark:bg-dark">
                <h2 className="font-bold text-[28px] uppercase">My wishlist</h2>
                <p>Manage your wishlist ({wishlist.length} items)</p>
            </div>


            <div className="flex flex-wrap gap-6 md:px-[8%] px-6 py-4">
                <div className="flex flex-col gap-2 w-full">
                {   
                    wishlist.length === 0 ?
                    <div className="min-h-[200px] flex flex-col gap-4 justify-center items-center">
                        <p className="font-bold text-[20px]">Your wishlist is empty</p>
                        <p className="">Find awesome gadgets in the shop</p>
                        <Button href="/" className="bg-primary border-none">SHOP PRODUCTS</Button>
                    </div>
                    :
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                        {
                            products.filter((item: IProduct) => wishlist.map((item: string) => item).indexOf(item.id) !== -1 ).map((product: IProduct) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        }
                    </div>
                }
                </div>
            
            </div>
        </div>
    )
}