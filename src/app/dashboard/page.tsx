'use client'
import { useContext, useEffect } from "react"
import { PiMoney, PiWatchLight } from "react-icons/pi";
import { FiCalendar, FiShoppingBag } from "react-icons/fi";
import { AuthContext } from "@/context/useAuth";
import Avatar from "@/components/avatar/avatar";
import { currencyFormatter } from "@/helpers/currencyFormatter";
import Button from "@/components/button/button";
import { useSession } from "next-auth/react";


function DashboardHome() {
    const { user } = useContext(AuthContext);
    const { data: session } = useSession()

    useEffect(() => {
        if (session) {
            const { user } = session;
            console.log(user); // This will log the complete user object
        }
    }, [session])

    return (
        <>
        
                <div className="w-full">
                    <div className="flex items-center gap-4 border border-transparent border-b-gray-500/[0.1] p-2 pb-4">
                        <Avatar user={user} />
                        <div className="">
                            <h1 className="text-[20px] font-semibold capitalize">Welcome back, <span className="Capitalize">{(user?.email)?.split("@")[0]}</span></h1>
                            <p className="leading-[180%] flex items-center text-[12px] opacity-[0.7] gap-2"> <PiWatchLight className="text-red-500 text-[14px]" />View your orders, products and discounts</p>
                        </div>
                        
                    </div>

                    <div className="flex sm:flex-nowrap flex-wrap py-8 gap-8">
                        <div className="flex flex-col gap-8 p-5 sm:w-[50%] w-full bg-red-600 text-tetiary backdrop-blur-sm bg-cover rounded-[15px]">
                            <h1 className="text-xl">Balance</h1>
                            <p className="p-1 px-6 rounded-full bg-white/[0.1] w-fit">{currencyFormatter(10000)}</p>
                            <div className="flex items-center gap-4 justify-between text-[10px] mt-8">
                                <div className="flex items-center gap-2">
                                    <FiShoppingBag size={16}/>
                                    <div>
                                        <p>{currencyFormatter(20000)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PiMoney size={16}/>
                                    <div>
                                        <p>{currencyFormatter(30000)}</p>
                                    </div>
                                </div>
                            </div>
                            <Button size="full" variant="secondary" href="/shop" className="bg-black/[0.4] rounded-full">Shop products</Button>
                        </div>
                        <div className="flex flex-col gap-8 p-5 sm:w-[50%] w-full bg-tetiary text-black bg-cover rounded-[15px]">
                            <h1 className="text-xl">Discount code</h1>
                            <p className="p-1 px-6 rounded-full bg-white/[0.1] w-fit">NEWBYE-1</p>
                            <div className="flex items-center gap-4 justify-between text-[10px] mt-8">
                                <div className="flex items-center gap-2">
                                    <FiCalendar size={16}/>
                                    <div>
                                        <p>20 Feb</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PiMoney size={16}/>
                                    <div>
                                        <p>{currencyFormatter(1000)}</p>
                                    </div>
                                </div>
                            </div>
                            <Button size="full" variant="secondary" href="/shop" className="bg-black/[0.4] rounded-full">Redeem code</Button>
                        </div>
                    </div>

                    
                </div>
        </>
    )
}

export default DashboardHome;