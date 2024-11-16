import { ICart } from "@/interface/store";

export interface order {
    id: string, 
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