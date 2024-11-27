import { User } from "firebase/auth";

export interface UserData extends User {
    id?: string,
    email: string | null,
    fullname?: string,
    img?: string,
    bio?: string,
    address?: string,
    role: "user" | "store",
}

export interface StoreData {
    [x: string]: string | number | boolean | string[] | null | undefined,
    id?: string,
    email: string | null,
    fullname?: string,
    storename: string,
    img?: string,
    bio?: string,
    address?: string,
    cover?: string,
    role: "user" | "store"
}

export interface ISignupData { email: string, password: string }