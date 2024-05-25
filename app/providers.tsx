// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}

export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}