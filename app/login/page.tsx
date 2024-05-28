import LoginForm from "../components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import React from "react";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (session) redirect("/profile");

    return (
        <main>
            <LoginForm />
        </main>
    );
}
