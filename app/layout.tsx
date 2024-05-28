import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {  AuthProvider } from "./providers";
import { fonts } from "./fonts";
import "../app/globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Parentify",
    description: "Parentify App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={fonts.rubik.variable}>
            <body className={inter.className}>
              <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
