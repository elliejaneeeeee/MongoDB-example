import { NextResponse } from "next/server";
import connect from "../lib/index";
import { ObjectId } from "mongodb";

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

export async function fetchUserById(id: string) {
  try {
    const userId = new ObjectId(id);
    const client = await connect();
    const db = client.db("test");

    const user = await db.collection("users").findOne({ _id: userId });
    
    if (!user) {
      return {error: "404 Error: Resource doesn't exist", status: 404}
    }

    return user

  } 
  catch (error) {
    return {error: "400 Error: Invalid ID Syntax", status: 400}
  }
}
