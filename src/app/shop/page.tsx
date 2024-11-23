'use client'
import { useContext, useEffect, useState } from "react";
import { PiInfoLight, PiPlusLight } from "react-icons/pi";
import { storeContext } from "@/context/useStore";
import { useRouter, useSearchParams } from "next/navigation";
import { IProduct } from "@/interface/store";
import Skeleton from "@/components/skeleton/skeleton";
import ProductCard from "@/components/cards/productCard";

function Shop()  {
    const [data, setData] = useState<IProduct[]>([])
    const { products } = useContext(storeContext)
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    // const [filters, setFilters] = useState<any>({ categories: [], price: "", rating: "", size: "" })
    const searchParams = useSearchParams()
    const search = searchParams.get("query") || ""

    useEffect(() => {
        setLoading(true)
        handleSearch(search)
        setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    const handleSearch = (query: string) => {
        setData(products.filter((item: IProduct) => (item.title.toUpperCase().indexOf(query.toUpperCase()) !== -1) || item.description.toUpperCase().indexOf(query.toUpperCase()) !== -1 || item.tags.indexOf(query) !== -1))
    }

    const setSearchParams = (search: string) => {
        router.push(`/shop?query=${search}`)
    }

    return (
        <main>
            <div className="flex flex-col items-center md:px-[8%] px-6 mt-2 py-12 bg-slate-100 dark:bg-dark">
                <h2 className="font-bold text-[28px] uppercase">Shop</h2>
                <p>Find and buy gadgets</p>
            </div>
            <div className={`relative dark:text-white md:px-[8%] mt-8 mb-8 md:flex gap-10`}>
                <div className="md:w-[30%] sticky top-[50px] left-0 h-full w-full bg-white dark:bg-black md:block hidden rounded text-[12px]">
                    
                    <div className="w-full p-4 border border-gray-500/[0.1] rounded-[10px]">
                        <p className="uppercase font-medium py-2 border border-transparent border-b-gray-500/[0.1]">Categories</p>
                        <div className="overflow-x-auto w-full mt-4">
                            <div className="flex flex-col gap-1">
                                {
                                    ["All", "Smartphones", "Laptops", "Audio", "Wearable", "Camera", "Accessories"].map((category: string, i: number) => (
                                        <button key={i} className="flex items-center justify-between gap-2 h-[45px]" onClick={() => setSearchParams(category === "All" ? "": category)}>
                                            <div className="flex items-center gap-4">
                                                <p className="capitalize">{category}</p>
                                            </div>
                                            <PiPlusLight className="" />
                                        </button>
                                    ))
                                }
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

export default Shop;