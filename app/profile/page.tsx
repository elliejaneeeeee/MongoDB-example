import React from "react";
import ProfileDetails from "../components/ProfileDetails";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import NavBar from "../components/NavBar";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/login");

    return (
        <>
            <NavBar />
            <ProfileDetails />
        </>
    );
}
