'use client'
import Button from "@/components/button/button";
import { storeContext } from "@/context/useStore";
import { currencyFormatter } from "@/helpers/currencyFormatter";
import { ICart, IProduct } from "@/interface/store";
import { Minus, Plus, Trash } from "@phosphor-icons/react";
import Image from "next/image";
import { useContext } from "react";

export default function CartPage() {
    const { products, removeFromCart, cart, changeQuantity } = useContext(storeContext)

    return (    
        <div className="flex flex-col gap-6">

            <h1 className="text-[32px] font-bold text-center py-12 my-2 bg-slate-100">MY CART</h1>
            <div className="lg:w-[60%] md:px-[8%] px-4 flex flex-col gap-2">
            {   
                cart.length === 0 ?
                <div className="min-h-[200px] flex flex-col gap-4 justify-center items-center">
                    <p className="font-bold text-[20px]">Your cart is empty</p>
                    <p className="">Find awesome gadgets in the shop</p>
                    <Button href="/" className="bg-primary border-none">SHOP PRODUCTS</Button>
                </div>
                :
                products.filter((item: IProduct) => cart.map((item: ICart) => item.id).indexOf(item.id) !== -1 ).map((product: IProduct) => (
                    <div key={product?.id} className="relative bg-white dark:bg-black flex items-center gap-2 p-2 mx-2 rounded border border-[#E4E4E7]/[0.5] dark:border-slate-100/[0.05]">
                        <button className="absolute top-0 left-0 bg-gray-500/[0.1] flex items-center gap-2 text-[10px] text-red cursor-pointer text-red-500 p-2" onClick={() => removeFromCart(product?.id) }><Trash className="text-[16px]"/></button>
                        <a href={`/product?id=${product?.id}`}>
                            <Image src={product?.images[0]} alt={product?.title} width={100} height={120} className="rounded bg-gray-100/[0.8] md:w-[120px] h-full w-[100px]" />
                        </a>
                        <div className="p-4 w-full flex flex-col justify-between">
                            <a href={`/product?id=${product?.id}`} className="mr-8 uppercase text-[12px] leading-[140%] font-bold">{product?.title}</a>
                            <div className="flex opacity-[0.6] text-[10px] items-center gap-4 leading-[120%] py-2">
                                <p>SIZE: {cart.filter((item: ICart) => item.id === product?.id).map((item: ICart) => item?.variation.size)}</p>
                                <p>COLOR: {cart.filter((item: ICart) => item.id === product?.id).map((item: ICart) => item?.variation.color)}</p>
                            </div>
                            
                            <div className="flex items-center mt-2 w-full">
                                <p className="flex items-center text-[18px] font-bold">{currencyFormatter(product?.price)}</p>
                            </div>
                            
                        </div>
                        
                        <div className="flex flex-col justify-center gap-2 border  border-[#E4E4E7]/[0.5] dark:bg-gray-100/[0.05] dark:border-slate-100/[0.05] p-1 items-center animate-zoom-in text-[8px]">
                            <button className="p-[8px] rounded"  onClick={() => changeQuantity(product.id, "ADD")}><Plus /></button>
                            <input className="p-[4px] py-0 text-center rounded bg-transparent w-[40px] text-[10px] py-2 text-center border border-gray-500/[0.2]" type="number" value={cart.filter((item: ICart) => item.id === product?.id).map((item: ICart) => item.quantity).toString()} onChange={(e) => changeQuantity(product.id, +e.target.value)} />
                            <button className="p-[8px] rounded" onClick={() => changeQuantity(product.id, "MINUS")}><Minus /></button>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}