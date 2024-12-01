'use client'
import { ReactElement, useState } from "react";
import { TbDashboard, TbListDetails, TbLogout, TbPackage, TbSettings, TbStar, TbUser, TbUsers } from "react-icons/tb";
import { Icon } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Avatar from "@/components/avatar/avatar";
import { signOut, useSession } from "next-auth/react";


export interface Link {
    id: number; label: string; icon: ReactElement<Icon>, link: string
}

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const { data } = useSession()
    const [open, setOpen] = useState(false)
    const pathname = usePathname();
    const router = useRouter()

    const generalLinks: Link[] = [
        { id: 0, label: "Dashboard", icon: <TbDashboard />, link: "/dashboard" },
        { id: 1, label: "Orders", icon: <TbListDetails />, link: "/dashboard/orders" },
        { id: 2, label: "Profile", icon: <TbUser />, link: "/dashboard/profile" },
        { id: 3, label: "Settings", icon: <TbSettings />, link: "/settings" },
    ]

    const storeLinks: Link[] = [
        ...generalLinks,
        { id: 4, label: "Products", icon: <TbPackage />, link: "/dashboard/products" },
        { id: 5, label: "Customers", icon: <TbUsers />, link: "/dashboard/customers" },
        { id: 6, label: "Reviews", icon: <TbStar />, link: "/dashboard/review" },
    ]

    if(!data?.user) {
        router.push("/login")
        return <></>
    }

    return (
        <>
            <button className="md:hidden fixed top-[14px] md:right-9 right-7 md:p-2 z-[4]" onClick={() => setOpen(!open)}><Avatar user={data?.user || { name: "user" }} /></button>
            <div className="flex relative w-full my-1 min-h-[85vh] border-t border-gray-500/[0.1] overflow-hidden">
                <div className={`flex flex-col justify-between lg:w-[20%] md:w-[24%] w-[240px] h-[88vh] md:sticky fixed md:top-0 top-[64px] py-4 md:px-8 right-0 bg-white dark:bg-black border border-transparent border-x-gray-500/[0.1] overflow-hidden z-[2] transition-all duration-700 ${open ? "translate-x-[0]": "md:translate-x-[0] translate-x-[130%]"}`}>  
                    <div className="flex flex-col gap-1">
                        {
                        (data?.user?.role === "Seller" ? storeLinks : generalLinks).map(link => {
                                return (
                                <Link key={link.id} href={ link.link} className={`flex items-center justify-between my-[3px] px-4 py-1 md:rounded ${pathname === link.link ? "bg-primary text-white" : " hover:bg-primary/[0.1] hover:text-primary"}`}>
                                    <span className="w-[30px] text-lg opacity-[0.6]">{link.icon}</span>
                                    <span className="flex-1 py-2 break-normal">{link.label}</span>
                                </Link>
                                )
                        })
                        }
                    </div>
                    
                    <button onClick={() => signOut()} className={`w-full flex items-center my-[3px] px-4 py-1 hover:bg-primary/[0.1] hover:text-primary rounded`}>
                        <span className="w-[30px] text-lg opacity-[0.6]"><TbLogout /></span>
                        <span className="py-2 break-normal">Logout</span>
                    </button>
                </div>

                <div className="flex-1 md:p-8 md:py-8 p-6">
                {
                    children
                }
                </div>
            </div>
        </>
    )    
}
