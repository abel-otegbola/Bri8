'use client'

import { FacebookLogo, InstagramLogo, XLogo } from "@phosphor-icons/react";


function Footer() {
    return (
        <footer className="bg-blue text-white mt-8 m-4 rounded-[20px]">
            <div className="grid md:grid-cols-4 grid-cols-2 items-start md:gap-[30px] gap-[60px] md:px-[8%] p-8 py-[60px]">
                <ul className="flex flex-col gap-[20px] justify-center">
                    <h2 className="font-semibold text-[16px]">NAVIGATIONS</h2>
                    <li className=""><a href="/" className="py-[5px] w-full">Home</a></li>
                    <li className=""><a href="/about" className="py-[5px] w-full">About</a></li>
                    <li className=""><a href="/shop" className="py-[5px] w-full">Shop</a></li>
                    <li className=""><a href="/contact" className="py-[5px] w-full">Contact Us</a></li>
                </ul>
                <ul className="flex flex-col gap-[20px] justify-center">
                    <h2 className="font-semibold text-[16px]">SUPPORTS</h2>
                    <li className=""><a href="/" className="py-[5px] w-full">Customer Support</a></li>
                    <li className=""><a href="/about" className="py-[5px] w-full">FAQs</a></li>
                    <li className=""><a href="/shop" className="py-[5px] w-full">Privacy Policy</a></li>
                    <li className=""><a href="/contact" className="py-[5px] w-full">T&C</a></li>
                </ul>
                <ul className="flex flex-col gap-[20px] justify-center">
                    <h2 className="font-semibold text-[16px]">OFFERS</h2>
                    <li className=""><a href="/" className="py-[5px] w-full">New Buyer Code</a></li>
                    <li className=""><a href="/about" className="py-[5px] w-full">Christmas Promo code</a></li>
                </ul>
                <div className="flex flex-col gap-4">
                    <h1 className="text-[20px] font-bold">Bri8 Gadgets</h1>
                    <a href="mailto:suppercaseort@ennovate.com" className="block py-1">Support@bri8.com</a>
                    <ul className="">
                        <div className="flex flex-wrap gap-4 py-2 mb-4">
                            <a href="https://facebook.com/" className="p-2 border border-gray-500/[0.4] rounded-full"><FacebookLogo size={18}/></a>
                            <a href="https://twitter.com/" className="p-2 border border-gray-500/[0.4] rounded-full"><XLogo size={18}/></a>
                            <a href="https://instagram.com/" className="p-2 border border-gray-500/[0.4] rounded-full"><InstagramLogo size={18}/></a>
                        </div>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-500/[0.2] text-center">
                <p className="px-[3%] py-10 flex items-center gap-2 justify-center">Bri8 &copy; Copyright  {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer;