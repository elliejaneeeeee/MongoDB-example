import { NextRequest, NextResponse } from "next/server";
import { fetchAllUsers } from "../../../models/users.models";

async function GET(req: NextRequest) {
  const users = await fetchAllUsers()
  return NextResponse.json({ users } , {status: 200 })
}

export { GET };
