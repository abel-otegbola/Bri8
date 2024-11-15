export interface UserData {
    [x: string]: string | number | boolean | string[] | null | undefined,
    id?: string,
    email: string | null,
    fullname?: string,
    img?: string,
    bio?: string,
    address?: string
}

export interface ISignupData { email: string, password: string }