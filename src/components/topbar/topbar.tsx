'use client'
import { ReactNode, useContext, useEffect, useState } from "react"
import Tab from "../tab/tab"
import Link from "next/link"
import { Bell, Gear, Heart, ShoppingCart, SignOut, Storefront, User, UserCircle } from "@phosphor-icons/react"
import Button from "../button/button"
import LogoIcon from "@/assets/icons/logo"
import Search from "../search/search"
import { AuthContext } from "@/context/useAuth"
import Avatar from "../avatar/avatar"
import Menu from "../navMenu/navMenu"

type navTab =  {
    id: number | string,
    label: string,
    to: string,
    icon: ReactNode
}

function Topbar() {
    const { user } = useContext(AuthContext)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
    })

    const navTabs: navTab[] = [
        { id: 0, label: "Shop", to: "/", icon: <Storefront/> },
        { id: 1, label: "Cart", to: "/cart", icon: <ShoppingCart/> },
        { id: 2, label: "Wishlist", to: "/wishlist", icon: <Heart/> },
        { id: 3, label: "Account", to: "/account", icon: <UserCircle/> },
    ]
    

    return (
        <div className="flex py-2 pt-4 md:px-[8%] px-6 justify-between items-center">
            <div className="md:w-[17%]">
                <Link href="/" className="w-[70px] h-[30px] rounded flex justify-center items-center font-bold">
                    <LogoIcon />
                </Link>
            </div>

            <nav className="flex justify-between md:static p-4 bg-white/[0.9] dark:bg-black/[0.9] backdrop-blur-sm fixed bottom-2 left-[4%] md:w-fit w-[92%] mx-auto rounded-lg md:border-none border border-gray-500/[0.1] items-center gap-4 z-[10]">
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
                <Link href="/cart" className="md:block hidden">
                    <ShoppingCart weight="light" size={20}/>
                </Link>
                {
                    user ?
                    <div className="relative">
                        <button onClick={() => setOpen(!open)} className="h-[40px] w-[40px]">
                            <Avatar user={user} />
                        </button>
                        {
                            open ?
                                <Menu close={setOpen} list={[ 
                                    {id: "0", title: "Account", icon: <User />, href: "/dashboard"},  
                                    {id: "1", title: "Settings", icon: <Gear />, href: "/settings"},  
                                    {id: "2", title: "Logout", icon: <SignOut />, href: "#"},  
                                ]} />
                            : ""
                        }
                    </div>
                    :
                    <Button href="/login">Login</Button>
                }
            </div>
        </div>
    )
}

export default Topbar;