import { NextRequest, NextResponse } from "next/server";
import { fetchAll } from "../../../models/utils";

async function GET(req: NextRequest) {
  const users = await fetchAll({coll: 'users'})
  return NextResponse.json({ users } , {status: 200 })
}

export { GET };
