import { storeContext } from "@/context/useStore"
import { currencyFormatter } from "@/helpers/currencyFormatter"
import { ICart, IProduct } from "@/interface/store"
import { order } from "@/schema/orders"
import { useContext } from "react"

export default function TotalPrice ({ discount, order }: { discount?: number, order?: order }) {
    const { cart, products } = useContext(storeContext)

    return (
        <p>
        {
            currencyFormatter(
                products.filter((item: IProduct) => (order ? order.cart : cart).map((item: ICart) => item.id).indexOf(item.id) !== -1 )
                .map((product: IProduct) => {return {price: +product?.price * cart.filter((item: ICart) => item.id === product?.id)[0]?.quantity}})
                .reduce((a: number,v: { price: number }) => a = a + v.price, 0) - (discount || 0)
            )
        }
        </p>
    )
}