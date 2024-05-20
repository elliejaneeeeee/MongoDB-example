import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import connect from "@/lib";

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connect();
    const db = client.db("sample_mflix");
    const result = await db
      .collection("movies")
      .find({ genres: "Crime" })
      .toArray();

    return NextResponse.json({ msg: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error}, { status: 404 });
  }
}

export { GET };
