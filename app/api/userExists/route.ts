import { log } from "console";
import connect from "../../../lib";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const client = await connect();
        const db = client.db("test");
        const { email } = await req.json();
        const user = await db.collection("users").findOne({ email: email });
        console.log(user);
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
    }
}
