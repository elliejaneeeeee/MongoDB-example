import { NextResponse } from "next/server";
import connect from "../lib/index";

export async function fetchAllForums() {
    const client = await connect();
    const db = client.db("test");
    const forums = await db.collection("forums").find({}).toArray();
    return forums;
}
