'use client'
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { AuthContext } from "@/context/useAuth";
import { registerSchema } from "@/schema/auth";
import { Envelope, LockKey, Spinner, Storefront, User, UserCircle } from "@phosphor-icons/react";
import { Formik } from "formik";
import Link from "next/link";
import { ReactNode, useContext, useState } from "react";

type navTab =  {
    id: number | string,
    label: string,
    to: string,
    icon: ReactNode
}

export default function Registerpage() {
    const { signUp, loading } = useContext(AuthContext)
    const [active, setActive] = useState("Buyer")

    const navTabs: navTab[] = [
        { id: 1, label: "Buyer", to: "#", icon: <User/> },
        { id: 2, label: "Seller", to: "#", icon: <Storefront/> },
    ]

    return (
        <div className="min-h-[400px] flex mt-4 md:mx-[12%] sm:items-center justify-between">

            <div className="flex w-full">
                <div className="sm:w-[550px] mx-auto w-full p-12">
                    
                    <div className="flex flex-col items-center gap-6 md:p-[5%] p-2">
                        <div>
                            <h1 className="font-bold text-[32px] text-center">Create Your Account</h1>
                            <p className="mt-2 mb-3 text-center">Add your details below to get started</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-gray-500/[0.06] p-2 rounded-[12px] w-full">
                        {
                            navTabs.map((tab: navTab) => (
                                <button key={tab.id} onClick={() => setActive(tab.label)} className={`${active === tab.label ? "border bg-white dark:bg-dark border-primary" : ""} flex items-center p-2 rounded-lg justify-center gap-2`}>{tab.icon}{tab.label}</button>
                            ))
                        }
                        </div>

                        <Formik
                            initialValues={{ fullname: '', email: '', password: '', role: '', storename: ''}}
                            validationSchema={registerSchema}
                            onSubmit={( values, { setSubmitting }) => {
                                signUp(
                                    active === "Buyer" ?
                                    {email: values.email, password: values.password, fullname: values.fullname, role: active}
                                    :
                                    {email: values.email, password: values.password, fullname: values.fullname, role: active, storename: values.storename}
                                );
                                setSubmitting(false);
                            }}
                            >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                            }) => (

                                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6 ">

                                    
                                    <Input name="fullname" label="" value={values.fullname} onChange={handleChange} type="text" error={touched.fullname ? errors.fullname : ""} placeholder="Full name" leftIcon={<UserCircle size={16}/>}/>

                                    {
                                        active === "Seller" ?
                                        <Input name="storename" label="" value={values.storename} onChange={handleChange} type="text" error={touched.storename ? errors.storename : ""} placeholder="Store name" leftIcon={<Storefront size={16}/>}/>
                                        :
                                        ""
                                    }

                                    <Input name="email" label="" value={values.email} onChange={handleChange} type="email" error={touched.email ? errors.email : ""} placeholder="Email Address" leftIcon={<Envelope size={16}/>}/>

                                    <Input name="password" label="" value={values.password} onChange={handleChange} type={"password"} error={touched.password ? errors.password : ""} placeholder="Password" leftIcon={<LockKey size={16}/>}/>

                                    <Button size="full" type="submit" className="">{ isSubmitting || loading ? <Spinner size={16} className="animate-spin" /> : "Login"}</Button>

                                </form>
                            )}
                        </Formik>
                        
                        <p className="text-center">Already have an account? <Link href={"/login"} className="text-primary">Sign in</Link></p>
                    </div>
                </div>
            </div>

        </div>
    )
}
