import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            authorize(credentials, req) {
                const user = { id: "1" };
                return user ? Promise.resolve(user) : Promise.resolve(null);
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
