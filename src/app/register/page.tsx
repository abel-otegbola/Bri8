'use client'
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { AuthContext } from "@/context/useAuth";
import { registerSchema } from "@/schema/auth";
import { Envelope, LockKey, Spinner, UserCircle } from "@phosphor-icons/react";
import { Formik } from "formik";
import Link from "next/link";
import { useContext } from "react";

export default function Registerpage() {
    const { signUp, loading } = useContext(AuthContext)

    
    return (
        <div className="min-h-[400px] flex mt-4 md:mx-[12%] sm:items-center justify-between">

            <div className="flex w-full">
                <div className="sm:w-[550px] mx-auto w-full p-12">
                    
                    <div className="flex flex-col items-center gap-6 md:p-[5%] p-2">
                        <div>
                            <h1 className="font-bold text-[32px] text-center">Create Your Account</h1>
                            <p className="mt-2 mb-3 text-center">Add your details below to get started</p>
                        </div>

                        <Formik
                            initialValues={{ fullname: '', email: '', password: ''}}
                            validationSchema={registerSchema}
                            onSubmit={( values, { setSubmitting }) => {
                                signUp({email: values.email, password: values.password}, "/dashbaord");
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
