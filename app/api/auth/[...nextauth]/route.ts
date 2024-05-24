import NextAuth from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "../../../../lib";
import bcrypt from "bcryptjs";

interface Credentials {
    email: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials): Promise<any> {
                const { email, password } = credentials as Credentials;
                try {
                    const client = await connect();
                    const db = client.db("test");

                    const user = await db
                        .collection("users")
                        .findOne({ email: email });
                    if (!user) {
                        return null;
                    }
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!passwordsMatch) {
                        return null;
                    }
                    return {
                        email: user.email,
                        name: user.full_name,
                    } as User;
                } catch (error) {
                    console.log(error);
                    return null;
                }
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
