'use client'
import { TbListDetails, TbTrash } from "react-icons/tb"
import { PiCheckCircle, PiCurrencyNgn } from "react-icons/pi"
import { useContext, useEffect, useState } from "react"
import { database } from "../../../firebase/firebase"
import { child, get, ref, set } from "firebase/database"
import Button from "../../../components/button/button"
import { useSearchParams } from "next/navigation"
import { storeContext } from "@/context/useStore"
import Image from "next/image"
import { ICart, IProduct } from "@/interface/store"
import { currencyFormatter } from "@/helpers/currencyFormatter"

export default function OrderSummary() {
    const searchParams = useSearchParams()
    const { products } = useContext(storeContext)
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState({fullname: "", country: "", address: "", phone: "", cart: [], user: { displayName: "", email: "", photo: "" }, date: "", paymentStatus: "", amount: ""})

    const id = searchParams.get("id")

    useEffect(() => {
        setLoading(true)
        const dbRef = ref(database);
        get(child(dbRef, `orders/${id}`))
        .then((snapshot) => {
        if (snapshot.exists()) {
            setOrder(snapshot.val());
            setLoading(false)
        } else {
            console.log({type: "error", msg: "No data available"});
            setLoading(false)
        }
        }).catch((error) => {
            console.error(error);
            setLoading(false)
        });
    }, [id])

    useEffect(() => {
        console.log(order)
    }, [order])

    const cancelOrder = () => {
        setLoading(true)
        // Payment control
        set(ref(database, 'orders/' + id), { ...order, paymentStatus: "cancelled" })
        .then(() => {
            setOrder({ ...order, paymentStatus: "cancelled" })
            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
        })
    }

    return (
        <div className="flex flex-wrap items-start gap-[5%] px-[3%] pr-0 py-[30px] min-h-[100vh]">
            <div className="md:w-[55%] w-full">
                <div className="flex md:justify-start justify-center md:items-start  items-center md:h-[90px] h-[120px] w-full">
                    <h1 className="uppercase font-bold flex gap-2 items-center text-[32px]">Order</h1>
                </div>
                    
                <div className="py-4 mb-4 border border-gray-200 dark:border-slate-100/[0.09]">
                    <div className="grid grid-cols-4 text-center text-md text-[12px] leading-[120%]">
                        {
                            ["pending", "processing", "Delivered", "Completed"].map((status: string, i: number) => (
                                <div key={i} className={`relative flex flex-col gap-2 items-center ${i < 2 ? "text-emerald-600" : "text-gray-500/[0.4]"}`}>
                                    <span className={`absolute h-[3px] ${i < 2 ? "bg-emerald-600" : "bg-gray-500/[0.2]"} top-[11px] left-0 ${i === 0 ? "w-[50%] left-[50%]" : i === 3 ? "w-[50%]" : "w-[100%] "}`}></span>
                                    <PiCheckCircle className="relative text-[25px] rounded-full bg-white dark:bg-black z-[2]" /> 
                                    <span>{status}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="px-4 my-4 bg-gray-200/[0.09]">
                    <h2 className="flex items-center gap-1 pt-4 flex justify-between">
                        <span className="font-semibold">ID:</span> {id}
                    </h2>
                    <h2 className="flex items-center justify-between gap-1 py-2 pb-4">
                        <span className="font-semibold">Status:</span> 
                        <p className="text-orange-600">{loading ? "" : order.paymentStatus}</p>
                    </h2>
                    <div className="pb-4 flex items-center justify-between gap-2">
                        <h3 className="font-semibold">Delivery: </h3>
                        <p>9:00am || 23<sup>rd</sup> March, 2024 </p>
                    </div>
                    <div className="pb-4 flex items-center justify-between gap-2 mb-4">
                        <h3 className="font-semibold">Shipping Address: </h3>
                        <p>{order.address}</p>
                    </div>
                </div>
            
                <Button size="full" disabled={order.paymentStatus === "cancelled"} onClick={() => cancelOrder()}><TbTrash /><span>Cancel Order</span></Button>

            </div>

            <div className="md:w-[40%] w-full md:mt-2 mt-12 my-2 p-4 bg-gray-200/[0.09] border border-gray-500/[0.2]">
                <h2 className="text-primary font-semibold uppercase flex items-center gap-1"><TbListDetails className="text-[18px]" /> Order details</h2>
                <div className="w-full py-2 overflow-x-auto text-[12px]">
                    <table className="table-auto text-left border-collapse w-full min-w-[400px]">
                        <thead>
                            <tr className="text-primary text-[11px]">
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {
                                products.filter((item: IProduct) => order.cart.map((item: ICart) => item.id).indexOf(item.id) !== -1 )
                                .map((product: IProduct) => (
                                    <tr key={product.id} className="border border-gray-500/[0.2] border-x-transparent">
                                        <td  className="py-2 gap-2"><Image src={product?.images[0]} alt={product.title} className="w-[30px] bg-gray-600 rounded" /> {product?.title}.</td>
                                        <td  className="py-2"><PiCurrencyNgn className="inline" /> {product?.price}.00</td>
                                        <td className="py-2">{order.cart.filter((item: ICart) => item.id === product?.id).map((item: ICart) => item.quantity)}</td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between py-4">
                    <p>Total</p>
                    {currencyFormatter(order?.amount)}
                </div>
            </div>
        </div>
    )
}