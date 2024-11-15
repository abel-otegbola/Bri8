'use client'
import React, { Suspense } from "react";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
        <Suspense>
            {children}
        </Suspense>
    );
};