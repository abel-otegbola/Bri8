'use client'
import { useContext, useEffect, useState } from "react"
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa"
import Button from "../../components/button/button"
import { storeContext } from "@/context/useStore"
import { useSearchParams } from "next/navigation"
import { ICart, IProduct } from "@/interface/store"
import Skeleton from "@/components/skeleton/skeleton"
import ProductCard from "@/components/cards/productCard"
import { gadgets } from "@/data/products"
import { currencyFormatter } from "@/helpers/currencyFormatter"
import Slider from "@/components/slider/slider"

export default function Product() {
    const searchParams = useSearchParams()
    const id = searchParams.get("id") || "0"
    const { cart, addToCart, removeFromCart, changeQuantity, wishlist, addToWishlist, removeFromWishlist, products } = useContext(storeContext)
    const [color] = useState("Black")
    // const [design, setDesign] = useState(1)
    const [size] = useState("S")
    const [product, setProduct] = useState<IProduct>()
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState("descriptions")

    // useEffect(() => {
    //     setColor(cart.filter((item: ICart) => item.id === id).map((item: ICart) => item?.variation.color)[0])
    //     setSize(cart.filter((item: ICart) => item.id === id).map((item: ICart) => item?.variation.size)[0])
    // }, [cart, id])

    useEffect(() => {
        setLoading(true)
        setProduct(gadgets.filter(item => item.id === id)[0])
        setLoading(false)
    }, [id])


    // const changeColor = (id: number | string | null, color: string) => {
    //     let newList = cart.map((item: any) => {
    //         if(item.id === id) {
    //             return {...item, color }
    //         }
    //         else return item;
    //     })
    //     setCart(newList)
    // }

    // const changeSize = (id: number | string | null, size: string) => {
    //     let newList = cart.map((item: any) => {
    //         if(item.id === id) {
    //             return {...item, size }
    //         }
    //         else return item;
    //     })
    //     setCart(newList)
    // }


    return (
        <div className="md:px-[8%] px-[3%] py-[50px]">
            {
                loading ? <Skeleton type="rectangle" /> :
                    <div key={id}>
                        <div className="relative flex flex-wrap my-2 rounded">
                            <div className="relative h-full md:w-[40%] w-full">
                                <Slider images={product?.images.map((img: string, i: number) => (
                                    { id: i.toString(), src: img }
                                )) || []} />
                            </div>
                            <div className="md:px-[3%] md:py-0 py-6 md:w-[60%] w-full">
                                <div className="flex justify-between items-center gap-6">
                                    <h2 className="py-2 md:text-[32px] text-[24px] font-medium uppercase">{product?.title}</h2>
                                    <div>
                                        {
                                            wishlist.indexOf(id || "") === -1 ? 
                                            <button className="flex items-center gap-2 animate-zoom-in  h-[40px] px-4" onClick={() => addToWishlist(id || "") }><FaHeart /></button> 
                                            : 
                                            <button className="flex items-center gap-2 animate-zoom-in h-[40px] px-4 text-red-500" onClick={() => removeFromWishlist(id || "")}><FaHeart /></button> 
                                        }
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-2 uppercase">
                                    <p className="flex items-center text-[40px] font-bold py-4">{currencyFormatter(+(product?.price || 0) * 1700)}</p>
                                    
                                </div>

                                <div className="flex gap-2 text-[10px] items-center">
                                    TAGS: {product?.tags.map(tag => <span className="px-3 py-1 border border-gray-500/[0.08] rounded-[20px]" key={tag}>{tag}</span>) }
                                </div>
                                <p className="py-4">CATEGORY: {product?.category}</p>

                                <div dangerouslySetInnerHTML={{ __html: product?.description || ""}} className="py-4"></div>
                                

                                <div className="mt-4 flex flex-wrap gap-4 justify-between items-center py-4 border border-transparent border-y-gray-500/[0.09]">
                                    <div className="">
                                        <p>Colors</p>
                                        <div className="flex items-center gap-4 mt-4">
                                            {
                                                product?.variations.colors.map((item: { name: string, img: string }, i: number) => (
                                                    <button 
                                                        key={i} 
                                                        style={{ backgroundColor: item.name }} 
                                                        className={`w-[25px] h-[25px] rounded-full border ${color === item.name ? "border-primary outline outline-offset-1 outline-primary" : "border-gray-500/[0.4]"}`} 
                                                        // onClick={() => {setColor(item); changeColor(id, item)}}
                                                    >
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="">
                                        <p>Size</p>
                                        <div className="grid grid-cols-5 items-center gap-4 mt-4">
                                            {
                                                product?.variations.size.map((item: { name: string, img: string }, i: number) => (
                                                    <button 
                                                        key={i} 
                                                        className={`p-[1px] w-full px-2 rounded ${size === item.name ? "bg-primary" : "border border-gray-500/[0.4]"}`} 
                                                        // onClick={() => {setSize(item); changeSize(id, item)}}
                                                    >{item.name}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>

                                


                                <div className="mt-6 flex items-center gap-4 md:py-4">
                                    
                                    <div className="text-[14px] sm:px-0 py-4 bg-white dark:bg-black w-full sm:z-0 z-[20]">
                                    {
                                        cart.map((item: ICart) => item.id).indexOf(id || "") === -1 ? 
                                        <Button className="" onClick={() => addToCart({id: id ||  "0", quantity: 1, variation: { color: "black", size: "LG" }}) }>Add to Cart</Button> 
                                        : 
                                        <div className="flex flex-wrap gap-6">
                                            <Button variant="tetiary" onClick={() => removeFromCart(id || "")}>Remove from Cart</Button>
                                            <div className="flex items-center gap-1 animate-zoom-in border border-gray-500/[0.1] rounded-lg">
                                                <button className="h-[40px] p-[12px]" onClick={() => changeQuantity(id || "", "MINUS")}><FaMinus /></button>
                                                <input className="p-[4px] py-0 text-center rounded bg-transparent w-[40px] text-[10px] py-2 text-center border border-gray-500/[0.2]" type="number" value={cart.filter((item: ICart) => item.id === id).map((item: ICart) => item.quantity).toString()} onChange={(e) => changeQuantity(id, +e.target.value)} />
                                                <button className="h-[40px] p-[12px]" onClick={() => changeQuantity(id || "", "ADD")}><FaPlus /></button>
                                            </div> 
                                            <Button href="/checkout">Proceed to Checkout</Button>
                                        </div>
                                        
                                    }
                                    </div>

                                   
                                </div>
                            </div>
                        </div> 
                        <div className="mt-4">
                            <div className="flex gap-4 items-center border border-transparent border-b-gray-500/[0.2] mb-4">
                                <button className={`px-6 py-1 ${active === "descriptions" ? "border border-transparent border-b-primary text-primary": ""}`} onClick={() => setActive("descriptions")}>Product Descriptions</button>
                                <button className={`px-6 py-1 ${active === "reviews" ? "border border-transparent border-b-primary text-primary": ""}`} onClick={() => setActive("reviews")}>Product Reviews</button>
                            </div>
                            <div className="w-full overflow-hidden">
                                <div className="flex w-[200%]">
                                    <div dangerouslySetInnerHTML={{ __html: product?.description || ""}} className={`${active === "descriptions" ? "translate-x-0" : "translate-x-[-100%]"} w-[100%] transform-all duration-700`}></div>
                                    <div className={`${active === "reviews" ? "translate-x-[-100%]" : "translate-x-[100%]"} w-[100%] transform-all duration-700`}>
                                        <h2 className="font-semibold uppercase">Product Reviews:</h2>
                                        <div className="h-full">No reviews posted yet</div>
                                    </div>     
                                </div>                           
                            </div>
                        </div>
                        <h2 className="border border-transparent border-b-gray-200 dark:border-b-gray-100/[0.1] mt-20 text-primary text-semibold uppercase">Related Products</h2>
                        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 py-[40px] ">
                            {
                                products.filter((item: IProduct) => (item.category === product?.category) && item.id !== id).slice(0,5).map((product: IProduct) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                            }
                        </div>
                    </div>
                    
            }

        </div>
    )
}