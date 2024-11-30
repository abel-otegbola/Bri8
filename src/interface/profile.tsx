export interface UserData {
    id?: string,
    email?: string | null,
    fullname?: string | null,
    image?: string | null,
    bio?: string,
    address?: string,
    role?: string,
}

export interface StoreData {
    [x: string]: string | number | boolean | string[] | null | undefined,
    id?: string,
    email: string | null,
    name?: string,
    storename: string,
    image?: string,
    bio?: string,
    address?: string,
    cover?: string,
    role: string
}

export interface ISignupData { email: string, password: string }