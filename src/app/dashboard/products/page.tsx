'use client'
import { useState } from "react";
import Skeleton from "@/components/skeleton/skeleton";
import Link from "next/link";
import { IProduct } from "@/interface/store";
import { currencyFormatter } from "@/helpers/currencyFormatter";

export default function Userproducts() {
    const [storeProducts,] = useState<IProduct[]>([])
    const [loading,] = useState(false)

    // useEffect(() => {
    //     loadproducts()
    // }, [])

    // const loadproducts = () => {
    //     setLoading(true)
    //     const projectsRef = ref(database, 'products/');
    //     let arr: product[] = []
    //     onValue(projectsRef, (snapshot) => {
    //         const data: any = snapshot.val();
    //         Object.keys(data).map((key: any) => {
    //             arr.push({id: key, data: data[key]})
    //         })
    //         setproducts(arr)
    //         setLoading(false)
    //     });
    // }

    return (
        
        <>
            <div className="items-center h-[80px]">
                <h2 className="font-bold text-[28px] uppercase">products</h2>
                <p>Manage your products</p>
            </div>
            <div className="w-full overflow-x-auto md:p-8 p-4 min-h-[400px] rounded-lg border border-gray-500/[0.1] bg-gray-100/[0.08]">
                <table className="table-auto text-left md:text-[12px] text-[10px] w-full">
                    <thead>
                        <tr className="font-bold uppercase border border-transparent border-b-gray-400/[0.2]">
                            <th className="p-2">Id</th>
                            <th className="p-2">Product</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Ctaegory</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            loading ? <Skeleton type="paragraph" /> :
                            storeProducts
                            .map((product: IProduct, i: number) => (
                                <tr key={product?.id} className={`border border-gray-500/[0.2] border-x-transparent py-4 text-[12px] ${i%2 === 0 ? "bg-slate-100 dark:bg-gray-200/[0.05]" : ""}`}>
                                    <td className="p-2"><Link href={`/dashboard/product?id=${product?.id}`}>{product?.id}</Link></td>
                                    <td>{product?.title}</td>
                                    <td className="p-2">
                                        {currencyFormatter(product?.price)}
                                    </td>
                                    <td>{product?.category}</td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}
