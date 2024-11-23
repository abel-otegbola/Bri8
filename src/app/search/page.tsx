'use client'
import ProductCard from "@/components/cards/productCard";
import SearchComponent from "@/components/search/search";
import { storeContext } from "@/context/useStore";
import { IProduct } from "@/interface/store";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get("search")?.toUpperCase() || ""
    const { products } = useContext(storeContext)

    return (
        <div className="min-h-[80vh]">
            <div className="flex flex-col items-center justify-center md:px-[8%] px-6 mt-2 py-12 bg-slate-100 dark:bg-dark">
                <h2 className="font-bold text-[28px] uppercase">Search</h2>
                <p className="mb-6">Search results for: ({query})</p>
                <SearchComponent className="md:w-[40%] mx-auto" placeholder="" />
            </div>

            <div className="lg:px-[8%] px-6 py-[40px] w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 py-2 my-4">
                {   
                    products.filter((item: IProduct) => (item.title.toUpperCase().indexOf(query) !== -1 || item.description.toUpperCase().indexOf(query) !== -1)).length < 1 ?
                    <h2>Couldn&apos;t find any project.</h2>
                    :
                    products.filter((item: IProduct) => (item.title.toUpperCase().indexOf(query) !== -1 || item.description.toUpperCase().indexOf(query) !== -1))
                    .map((product: IProduct) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })
                }
            </div>
        </div>
    )
}