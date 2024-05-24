import { NextRequest, NextResponse } from "next/server";
import { fetchAllArticles } from "../../../models/articles.models";

async function GET(req: NextRequest) {
  const articles = await fetchAllArticles();
  return NextResponse.json({ articles }, { status: 200 });
}

export { GET };
