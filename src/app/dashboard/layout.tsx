'use client'
import { ReactElement, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase/firebase";
import { TbDashboard, TbListDetails, TbLogout, TbSettings, TbUser } from "react-icons/tb";
import { Icon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import Link from "next/link";


export interface Link {
    id: number; label: string; icon: ReactElement<Icon>, link: string
}

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const [open,] = useState(false)
    const auth = getAuth(app);
    const pathname = usePathname();

    const generalLinks: Link[] = [
        { id: 0, label: "Dashboard", icon: <TbDashboard />, link: "/dashboard" },
        { id: 1, label: "Orders", icon: <TbListDetails />, link: "/dashboard/orders" },
        { id: 2, label: "Profile", icon: <TbUser />, link: "/dashboard/profile" },
        { id: 4, label: "Settings", icon: <TbSettings />, link: "/settings" },
    ]

    return (
        <>

            <div className="flex relative w-full md:px-8 px-6 my-2 h-[85vh] border-t border-gray-500/[0.1]">
                <div className={`flex flex-col justify-between lg:w-[18%] md:w-[20%] w-[240px] md:sticky absolute top-0 p-4 pr-8 md:pl-0 left-0 bg-white dark:bg-black md:border border-transparent border-r-gray-500/[0.1] overflow-hidden z-10 transition-all duration-700 ${open ? "translate-x-[0]": "md:translate-x-[0] translate-x-[-130%]"}`}>  
                    <div className="flex flex-col gap-1">
                        {
                        generalLinks.map(link => {
                                return (
                                <Link key={link.id} href={ link.link} className={`flex items-center justify-between my-[3px] px-4 py-1 rounded ${pathname === link.link ? "bg-primary text-white" : " hover:bg-primary/[0.1] hover:text-primary"}`}>
                                    <span className="w-[30px] text-lg opacity-[0.6]">{link.icon}</span>
                                    <span className="flex-1 py-2 break-normal">{link.label}</span>
                                </Link>
                                )
                        })
                        }
                    </div>
                    
                    <button onClick={() => signOut(auth)} className={`w-full flex items-center my-[3px] px-4 py-1 hover:bg-primary/[0.1] hover:text-primary rounded`}>
                        <span className="w-[30px] text-lg opacity-[0.6]"><TbLogout /></span>
                        <span className="py-2 break-normal">Logout</span>
                    </button>
                </div>

                    <div className="flex-1 md:p-8 md:py-8 py-[60px]">
                {
                    children
                }
                </div>
            </div>
        </>
    )    
}
