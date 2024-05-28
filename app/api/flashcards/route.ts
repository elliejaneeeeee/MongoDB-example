import { fetchAll } from "../../../models/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
      const flashcards: Array<{}> = await fetchAll({coll: 'flashcards'});
      return NextResponse.json({ flashcards }, { status: 200 });
    } catch (error) {
      return NextResponse.next();
    }
  }