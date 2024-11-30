import { UserData } from "@/interface/profile"
import Image from "next/image"

export default function Avatar({ user }: { user: UserData }) {

    if(user?.image) {
        return (
            <Image src={user?.image || ""} alt="user" width={32} height={32} className="rounded-full" />
        )
    }
    else {
       return <p className="h-[36px] w-[36px] flex items-center justify-center bg-primary/[0.4] text-white font-bold rounded-full uppercase">{user?.fullname ? user?.fullname.charAt(0) : user?.email?.charAt(0)}</p>
    }
}