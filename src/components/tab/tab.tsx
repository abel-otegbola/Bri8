'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkHTMLAttributes, ReactNode } from "react";

interface tabProps extends LinkHTMLAttributes<HTMLLinkElement> {
    href: string;
    label: string;
    icon?: ReactNode;
}

export default function Tab ({ href, label, icon, ...props }: tabProps) {
    const pathname = usePathname()

    return (
        <Link
            href={href}
            className={`flex items-center justify-center md:flex-row flex-col md:gap-1 gap-2 h-[32px] p-[8px_16px] hover:text-primary font-light rounded-lg duration-500
                ${pathname === href ? "text-primary" : "hover:bg-primary/[0.02]"}
                ${props.className}
            `}
        >
            <span className={`opacity-[0.6] md:text-md md:text-[16px] duration-300 ${pathname === href ? "text-[24px]": "text-[16px]"}`}>{icon}</span>
            <span className="md:inline md:text-[12px] text-[10px] duration-500 ">{pathname === href ? 
                <>
                    <span className="md:hidden block w-1 h-1 rounded-full bg-primary"></span>
                    <span className="md:block hidden">{label}</span> 
                </>
                : label}
            </span>
        </Link>
    )
}