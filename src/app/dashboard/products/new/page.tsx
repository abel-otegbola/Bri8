'use client'
import { useState } from "react";
import { IProduct } from "@/interface/store";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Textarea from "@/components/textarea/textarea";
import { X } from "@phosphor-icons/react";

export default function Userproducts() {
    const [data, setData] = useState<IProduct>({ id: "12345" } as IProduct)
    const [tag, setTag] = useState("")

    const addTag = () => {
        if(data.tags) {
            if(data?.tags?.indexOf(tag) === -1 && tag !== "") {
                setData({ ...data, tags: [ ...data.tags, tag ]})
                setTag("")
            }
        }
        else {
            setData({ ...data, tags: [ tag ]})
        }
    }

    return (
        
        <>
        <div className="flex justify-between items-center gpa-6 flex-wrap pb-8">
            <div className="items-center">
                <h2 className="font-bold text-[28px] uppercase">New Product</h2>
                <p>Create a new product</p>
            </div>
            <Button className="text-white">Save</Button>
        </div>
            <div className="w-full overflow-x-auto md:p-8 p-4 min-h-[400px] rounded-lg border border-gray-500/[0.1] bg-gray-100/[0.04]">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                    <div>
                        <div className="flex flex-col gap-2 py-4">
                            <label htmlFor="title">Title</label>
                            <Input id="title" onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="Enter product title" />
                        </div>
                        <div className="flex flex-col gap-2 py-4">
                            <label htmlFor="category">Category</label>
                            <Input id="category" onChange={(e) => setData({ ...data, category: e.target.value })} placeholder="Enter product category" />
                        </div>
                        <div className="flex flex-col gap-2 py-4">
                            <label htmlFor="price">Price</label>
                            <Input id="price" onChange={(e) => setData({ ...data, price: e.target.value })} placeholder="Enter product price" />
                        </div>
                        <div className="flex flex-col gap-2 py-4">
                            <label htmlFor="descriptions">Description</label>
                            <Textarea id="descriptions" onChange={(e) => setData({ ...data, title: e.target.value })} placeholder="Enter product descriptions" />
                        </div>
                    </div>
                    
                    <div className="flex gap-4 flex-col">
                        <div className="flex flex-col gap-2 py-4">
                            <label htmlFor="images"> Images</label>
                            <div className="h-[150px] gap-2 w-full overflow-x-auto bg-tetiary/[0.5] dark:bg-tetiary/[0.09] rounded p-2">

                            </div>
                            <Input id="images" type="file" className="hidden" onChange={(e) => setData({ ...data, images: [...data.images, e.target.value ]})} placeholder="Enter product title" />
                            <label htmlFor="images" className="px-3 py-1 border border-gray-500/[0.2] rounded w-fit">New Image</label>
                        </div>
                        <div className="flex flex-col gap-2 py-4 px-2 bg-tetiary/[0.2] dark:bg-tetiary/[0.09] rounded">
                            <label htmlFor="tags">Tags</label>
                            <div className="flex gap-2 items-center">
                                <Input id="tags" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Enter product tags" />
                                <Button onClick={() => addTag()}>Add</Button>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                            {
                                data?.tags?.map(tag => (
                                    <div key={tag} className="flex gap-2 text-[12px] px-2 py-1 border border-gray-500/[0.2]rounded w-fit">
                                        <span>{tag}</span>
                                        <button className="text-red" onClick={() => setData({ ...data, tags: data.tags.filter(item => item !== tag) })}><X size={12} /></button>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 py-4">
                            <label htmlFor="stock">Stock</label>
                            <Input id="stock" type="number" onChange={(e) => setData({ ...data, stocks: +e.target.value })} placeholder="Number of product available" />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
