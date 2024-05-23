import { NextResponse } from "next/server";
import connect from "../lib/index";

export async function fetchAllArticles() {
  try {
    const client = await connect();
    const db = client.db("test");
    const articles = await db.collection("articles").find({}).toArray();

    return articles;
  } catch (error) {
    NextResponse.next();
  }
}
