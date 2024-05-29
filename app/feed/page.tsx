
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function Home() {
  
    const session = await getServerSession(authOptions);
   
    return (
        <>
        <NavBar/>
        
        </>
        
    );
}
