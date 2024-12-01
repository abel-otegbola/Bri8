'use client'

import Button from "../../../components/button/button";
import Input from "@/components/input/input";
import { Envelope, User } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";

export default function Profile() {
    const { data } = useSession()

    return (
        <div className="">
            <div className="items-center h-[80px]">
                <h2 className="font-bold text-[28px] uppercase">Profile</h2>
                <p>Manage and update your profile details</p>
            </div>
            <div className="p-8 rounded-lg border border-gray-500/[0.1] bg-gray-100/[0.08]">
                        <div className="py-2 mb-1">
                            <div className="flex gap-2 items-center">
                                <div className="h-[60px] w-[60px] rounded-full bg-slate-200 dark:bg-slate-200/[0.04]"></div>
                            </div>
                        </div>
                        <div className="py-2 mb-1">
                            <div className="flex flex-col gap-2">
                                <p className="md:w-[30%] md:mb-0 mb-2">Username: </p>
                                <Input defaultValue={data?.user?.fullname || ""} leftIcon={<User />} />
                            </div>
                        </div>
                        <div className="py-2 mb-4">
                            <div className="flex flex-col gap-2">
                                <p className="md:w-[30%] md:mb-0 mb-2">Email: </p>
                                <Input defaultValue={data?.user?.email || ""} leftIcon={<Envelope />}/>
                            </div>
                        </div>
                        <Button>Save changes</Button>
                </div>
        </div>
    )
}