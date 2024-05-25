import { NextRequest, NextResponse } from "next/server";
import { insertUser } from "../../../models/users.models";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { name, username, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        insertUser(username, name, email, hashedPassword);

        return NextResponse.json({ msg: "User registered" }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}
