'use client'
import { ReactNode, useContext, useEffect, useState } from "react"
import Tab from "../tab/tab"
import Link from "next/link"
import { Bell, Gear, Heart, ShoppingCart, SignIn, SignOut, Storefront, User, UserCircle } from "@phosphor-icons/react"
import LogoIcon from "@/assets/icons/logo"
import Avatar from "../avatar/avatar"
import Menu from "../navMenu/navMenu"
import { usePathname } from "next/navigation"
import Search from "../search/search"
import { storeContext } from "@/context/useStore"
import { useSession } from "next-auth/react"
import { useOutsideClick } from "@/helpers/useClickOutside"

type navTab =  {
    id: number | string,
    label: string,
    to: string,
    icon: ReactNode
}

function Topbar() {
    const { cart } = useContext(storeContext)
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const { data } = useSession()

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
    })

    const navTabs: navTab[] = [
        { id: 0, label: "Shop", to: "/shop", icon: <Storefront/> },
        { id: 1, label: "Cart", to: "/cart", icon: <ShoppingCart/> },
        { id: 2, label: "Wishlist", to: "/wishlist", icon: <Heart/> },
        { id: 3, label: "Account", to: "/dashboard", icon: <UserCircle/> },
    ]
    
    const accountPages = ["dashboard", "admin", "agent"]

    const closeMenu = useOutsideClick(setOpen, false)


    return (
        <div className={`flex py-2 pt-4 md:static fixed top-0 left-0 w-full justify-between items-center bg-white dark:bg-black z-[3] ${accountPages.includes(pathname.split("/")[1]) ? "md:px-10 pl-6 pr-[100px] md:py-2 py-5" : "md:px-[8%] px-6"}`}>
            <div className="md:w-[17%]">
                <Link href="/" className="w-[70px] h-[30px] rounded flex justify-center items-center font-bold">
                    <LogoIcon />
                </Link>
            </div>

            <nav className="flex justify-between md:static p-4 bg-white/[0.9] dark:bg-black/[0.9] backdrop-blur-sm fixed bottom-0 left-0 md:w-fit w-full md:border-none border border-gray-500/[0.1] items-center gap-4 z-[10]">
                {
                    navTabs.map((tab: navTab) => (
                        <Tab key={tab.id} label={tab.label} href={tab.to} icon={tab.icon} />
                    ))
                }
            </nav>

            <div className="flex gap-8 items-center">
                <Search placeholder="Search products" className="md:flex hidden" />
                <Link href="/inbox">
                    <Bell weight="light" size={20}/>
                </Link>
                <Link href="/cart" className="relative">
                    <ShoppingCart weight="light" size={20}/>
                    <span className="absolute text-[8px] -top-2 -right-2 px-1 py-0 rounded-full bg-green-600 text-white">{cart.length}</span>
                </Link>
                <div ref={closeMenu} className={`relative ${accountPages.includes(pathname.split("/")[1]) ? "md:block hidden" : "block"}`}>
                    <button onClick={() => setOpen(!open)} className="h-[40px] w-[40px]">
                        <Avatar user={data?.user || { fullname: "user" }} />
                    </button>
                    {
                        open ?
                            <Menu close={setOpen} list={[ 
                                data?.user ? {id: "0", title: "Account", icon: <User />, href: "/dashboard"}: {id: "0", title: "Start selling", icon: <Storefront />, href: "/register"},  
                                {id: "1", title: "Settings", icon: <Gear />, href: "/settings"},  
                                data?.user ? {id: "2", title: "Logout", icon: <SignOut />, href: "#"} : {id: "2", title: "Login", icon: <SignIn />, href: "/login"},  
                            ]} />
                        : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default Topbar;