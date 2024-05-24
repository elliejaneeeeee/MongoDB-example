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
      return { error: "404 Error: Resource doesn't exist", status: 404 };
    }

    return user;
  } catch (error) {
    return { error: "400 Error: Invalid ID Syntax", status: 400 };
  }
}

export async function insertUser(
  username: string,
  full_name: string,
  email: string,
  password: string
) {
  try {
    const client = await connect();
    const db = client.db("test");

    const isAlreadyExisting = await db
      .collection("users")
      .findOne({ username: username });

    if (isAlreadyExisting) {
      throw new Error("Username Already Exists!");
    }

    const newUser = {
      _id: new ObjectId(),
      username,
      full_name,
      email,
      password,
      bookmarks: 0,
      progress: [],
    };

    const status = await db.collection("users").insertOne(newUser);
    const userPosted = await db
      .collection("users")
      .findOne({ _id: status.insertedId });
    const post = { ...status, ...userPosted };

    return post;
  } catch (error: any) {
    throw new Error(error);
  }
}
