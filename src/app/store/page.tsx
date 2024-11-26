'use client'
import { useContext, useEffect, useState } from "react";
import { PiInfoLight } from "react-icons/pi";
import { storeContext } from "@/context/useStore";
import { useRouter, useSearchParams } from "next/navigation";
import { IProduct } from "@/interface/store";
import Skeleton from "@/components/skeleton/skeleton";
import ProductCard from "@/components/cards/productCard";
import Link from "next/link";
import { Envelope, FacebookLogo, InstagramLogo, Phone, WhatsappLogo, XLogo } from "@phosphor-icons/react";

function StorePage()  {
    const [data, setData] = useState<IProduct[]>([])
    const { products } = useContext(storeContext)
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    // const [filters, setFilters] = useState<any>({ categories: [], price: "", rating: "", size: "" })
    const searchParams = useSearchParams()
    const search = searchParams.get("seller") || ""

    useEffect(() => {
        setLoading(true)
        handleSearch(search)
        setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    const handleSearch = (search: string) => {
        setData(products.filter((item: IProduct) => item.store === search))
    }

    const setSearchParams = (search: string) => {
        router.push(`/shop?query=${search}`)
    }

    return (
        <main>
            <div className="flex flex-col items-center md:px-[8%] px-6 mt-2 py-12 bg-slate-100 dark:bg-dark">
                <h2 className="font-bold text-[28px] uppercase">{search}</h2>
                <p>Find and buy gadgets</p>
            </div>
            <div className={`relative dark:text-white md:px-[8%] mt-8 mb-8 md:flex gap-10`}>
                <div className="md:w-[30%] sticky top-[50px] left-0 h-full w-full bg-white dark:bg-black md:block hidden rounded text-[12px]">
                    
                    <div className="w-full p-4 border border-gray-500/[0.1] rounded-[10px]">
                        <p className="uppercase font-medium py-2 border border-transparent border-b-gray-500/[0.1]">Contact seller</p>
                        <div className="overflow-x-auto w-full mt-4">
                            <Link href={`mailto:${search}@gmail.com`} className="mb-4 p-2 rounded bg-slate-100 dark:bg-dark flex gap-2 items-center"><Envelope /> {search}@gmail.com</Link>
                            <Link href={`tel:07060989331`} className="mb-4 p-2 rounded bg-slate-100 dark:bg-dark flex gap-2 items-center"><Phone /> 07060989331</Link>
                            <div className="flex gap-3">
                                <Link href="https://api.whatsapp.com/" className="p-2 border border-gray-500/[0.4] rounded-full"><WhatsappLogo size={18}/></Link>
                                <Link href="https://facebook.com/" className="p-2 border border-gray-500/[0.4] rounded-full"><FacebookLogo size={18}/></Link>
                                <Link href="https://twitter.com/" className="p-2 border border-gray-500/[0.4] rounded-full"><XLogo size={18}/></Link>
                                <Link href="https://instagram.com/" className="p-2 border border-gray-500/[0.4] rounded-full"><InstagramLogo size={18}/></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:w-[70%] w-full">

                    <section className=" md:px-0 px-4">

                            { loading ? <Skeleton type="rectangle" /> :
                            data.length !== 0 ?
                            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 md:gap-8 gap-4">
                                {
                                    data.map((product: IProduct) => (
                                        <div key={product.id}>
                                            <ProductCard  product={product} />
                                        </div>
                                    ))
                                }
                            </div>
                            : 
                                <div className="w-full h-[40vh] flex flex-col items-center justify-center gap-4 p-[3%]">
                                    <PiInfoLight className="text-primary text-[30px] p-1 rounded-full mr-4 border border-gray-500/[0.2]" onClick={() => setSearchParams("")} /> 
                                    <p className="">No Product found</p>
                                    <a className="px-6 py-[2px] border border-primary text-primary rounded" onClick={() => setSearchParams("")}>Refresh</a>
                                </div>
                            }
                    </section>
                </div>
            </div>
           
           

        </main>
    )
}

export default StorePage;