'use client'
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import TotalPrice from "@/components/totalPrice/totalPrice";
import { storeContext } from "@/context/useStore";
import { currencyFormatter } from "@/helpers/currencyFormatter";
import { checkoutSchema } from "@/schema/checkout";
import { Envelope, Globe, MapPin, Phone, User } from "@phosphor-icons/react";
import { Formik } from "formik";
import { useContext } from "react";
import { LoaderIcon } from "react-hot-toast";

export default function CheckoutPage() {
    const { cart } = useContext(storeContext)
    
    return (
        <div className="flex flex-col gap-6">

            <div className="flex flex-col items-center md:px-[8%] px-6 mt-2 py-12 bg-slate-100 dark:bg-dark">
                <h2 className="font-bold text-[28px] uppercase">Checkout</h2>
                <p>Buy ({cart.length} items) now</p>
            </div>

            <div className="flex flex-wrap gap-6 md:px-[8%] px-6 py-4">
                <div className="lg:w-[60%] w-full flex flex-col gap-2">
                    <Formik
                        initialValues={{ fullname: '', email: '', country: '', address: '', phone: 0 }}
                        validationSchema={checkoutSchema}
                        onSubmit={( values, { setSubmitting }) => {
                            
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
                            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
                                <Input name="fullname" label="" value={values.fullname} onChange={handleChange} type="text" error={touched.fullname ? errors.fullname : ""} placeholder="Full name" leftIcon={<User size={16}/>}/>
                                <Input name="email" label="" value={values.email} onChange={handleChange} type="email" error={touched.email ? errors.email : ""} placeholder="Email" leftIcon={<Envelope size={16}/>}/>
                                <Input name="country" label="" value={values.country} onChange={handleChange} type="text" error={touched.country ? errors.country : ""} placeholder="Country" leftIcon={<Globe size={16}/>}/>
                                <Input name="address" label="" value={values.address} onChange={handleChange} type="text" error={touched.address ? errors.address : ""} placeholder="Address" leftIcon={<MapPin size={16}/>}/>
                                <Input name="phone" label="" value={values.phone} onChange={handleChange} type="text" error={touched.phone ? errors.phone : ""} placeholder="Phone number" leftIcon={<Phone size={16}/>}/>

                                <Button className="full" disabled={isSubmitting} >{ isSubmitting ? <LoaderIcon/> : "Buy now" }</Button>
                            </form>
                        )}
                        </Formik>
                </div>
                
                <div className="sm:static gap-2 md:w-[30%] w-[100%] rounded-[20px] p-6 bg-gray-300/[0.08]">
                    <h2 className="text-[16px] uppercase font-bold">Summary</h2>
                    <div className="flex flex-col gap-2 py-6">
                        <div className="flex justify-between items-center">
                            <p>Items</p>
                            <p>{cart.length}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>Subtotal</p>
                            <p><TotalPrice /></p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>Discount</p>
                            <p>{currencyFormatter(cart.length !== 0 ? 1000 : 0)}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>Total</p>
                            <p className="text-lg font-bold"><TotalPrice discount={cart.length !== 0 ? 1000 : 0} /></p>
                        </div>
                    </div>
                    <Button href="/shop" variant="secondary" className="mb-4 w-full">Back to shop</Button>
                </div>
            </div>

        </div>
    )
}