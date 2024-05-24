import { NextResponse } from "next/server";
import connect from "../lib/index";


export async function fetchAllUsers() {
  try {
    const client = await connect();
    const db = client.db("test");
    const users = await db.collection("users").find({}).toArray();

    return users;
  } catch (error) {
    NextResponse.next();
  }
}


