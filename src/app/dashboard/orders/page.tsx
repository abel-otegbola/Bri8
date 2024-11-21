'use client'
import { useContext, useEffect, useState } from "react";
import { storeContext } from "@/context/useStore";
import { AuthContext } from "@/context/useAuth";
import Skeleton from "@/components/skeleton/skeleton";
import Link from "next/link";
import Image from "next/image";
import { ICart, IProduct } from "@/interface/store";
import { currencyFormatter } from "@/helpers/currencyFormatter";

export interface order {
    id: string,
    data: { 
        fullname: string,
        country: string, 
        address: string, 
        phone: string, 
        user: { displayName: string, email: string, photo: string }, 
        amount: string,
        paymentStatus: string,
        cart: ICart[],
        date: string,
    }

}

export default function UserOrders() {
    const [orders,] = useState<order[]>([])
    const [loading,] = useState(false)
    const { products } = useContext(storeContext)
    const { user } = useContext(AuthContext);

    // useEffect(() => {
    //     loadOrders()
    // }, [])

    useEffect(() => {
        console.log(orders)
    }, [orders])

    // const loadOrders = () => {
    //     setLoading(true)
    //     const projectsRef = ref(database, 'orders/');
    //     let arr: order[] = []
    //     onValue(projectsRef, (snapshot) => {
    //         const data: any = snapshot.val();
    //         Object.keys(data).map((key: any) => {
    //             arr.push({id: key, data: data[key]})
    //         })
    //         setOrders(arr)
    //         setLoading(false)
    //     });
    // }

    return (
        
        <>
            <div className="items-center h-[80px]">
                <h2 className="font-bold text-[28px] uppercase">Orders</h2>
                <p>Manage your orders</p>
            </div>
            <div className="w-full overflow-x-auto md:p-8 p-4 min-h-[400px] rounded-lg border border-gray-500/[0.1] bg-gray-100/[0.08]">
                <table className="table-auto text-left md:text-[12px] text-[10px] w-full">
                    <thead>
                        <tr className="font-bold uppercase border border-transparent border-b-gray-400/[0.2]">
                            <th className="p-2">Id</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Product</th>
                            <th className="p-2">Total</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            loading ? <Skeleton type="paragraph" /> :
                            orders.filter((item: order) => item?.data.user.email === user.email)
                            .map((order: order, i: number) => (
                                <tr key={order?.id} className={`border border-gray-500/[0.2] border-x-transparent py-4 text-[12px] ${i%2 === 0 ? "bg-slate-100 dark:bg-gray-200/[0.05]" : ""}`}>
                                    <td className="p-2"><Link href={`/dashboard/order?id=${order?.id}`}>{order?.id}</Link></td>
                                    <td>{order?.data.date}</td>
                                    <td className="p-2 text-[10px]">
                                        <Link href={`/dashboard/order?id=${order?.id}`}>
                                        <ol className="">
                                        {
                                            products.filter((item: IProduct) => order?.data.cart.map((item: ICart) => item.id).indexOf(item.id) !== -1 ).map((product: IProduct) => (
                                                    <li key={product.id} className="flex gap-2 my-1"><Image alt={product.title} src={product?.images[0]} className="w-[30px] bg-gray-600 rounded" />{product?.title}</li>
                                            ))
                                        }
                                        </ol>
                                        </Link>
                                    </td>
                                    <td className="p-2">
                                        {currencyFormatter(order?.data.amount)}
                                    </td>
                                    <td className={`${order.data.paymentStatus === "Shipped" ? "text-emerald-600" : order?.data.paymentStatus === "Paid" ? "text-orange-600" : "text-red-600"} p-2 text-[11px]`}>
                                        <Link href={`/dashboard/order?id=${order?.id}`}>{order?.data.paymentStatus}</Link>
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}
