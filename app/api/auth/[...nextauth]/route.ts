import NextAuth from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "../../../../lib";
import bcrypt from "bcryptjs";
import { NextApiHandler } from "next";
import { JWT } from "next-auth/jwt";
import { Lesson } from "../../../../types";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials): Promise<User | null> {
        const { email, password } = credentials as Credentials;
        try {
          const client = await connect();
          const db = client.db("Parentify");

          const user = await db.collection("users").findOne({ email: email });
          if (!user) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);


                    if (!passwordsMatch) {
                        return null;
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.full_name,
                        username: user.username,
                        bookmarks: user.bookmarks || [],
                        progress: user.progress || [],
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
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.bookmarks = user.bookmarks || [];
                token.progress = user.progress || [];
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.bookmarks = token.bookmarks as any[];
                session.user.progress = token.progress as Lesson[];
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};
const handler: NextApiHandler = NextAuth(authOptions);

export { handler as GET, handler as POST };
