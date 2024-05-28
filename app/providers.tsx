"use client";
import { SessionProvider } from "next-auth/react";
import React, { FC, PropsWithChildren } from "react";

type AuthProviderProps = PropsWithChildren;

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};
