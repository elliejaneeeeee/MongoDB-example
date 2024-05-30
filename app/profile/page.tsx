import React from "react";
import ProfileDetails from "../components/ProfileDetails";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/login");

    return (
        <>
            <Box
                overflowX="hidden"
                overflowY="auto"
                bg="yellow.100"
                minHeight="100vh"
                display="flex"
                flexDirection="column"
            >
                <NavBar />
                <ProfileDetails />
            </Box>
        </>
    );
}
