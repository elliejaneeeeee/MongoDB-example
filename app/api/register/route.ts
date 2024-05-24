import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, username, email, password } = await req.json();
        console.log("Name:", name);
        console.log("Username:", username);

        return NextResponse.json({ msg: "User registered" }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}
