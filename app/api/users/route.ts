import { NextRequest, NextResponse } from "next/server";
import { fetchAllUsers, insertUser } from "../../../models/users.models";

async function GET(req: NextRequest) {
  const users = await fetchAllUsers();
  return NextResponse.json({ users }, { status: 200 });
}

async function POST(req: Request) {
  const parsedRequest = await req.json();
  const { username, full_name, email, password } = parsedRequest.body;

  if (!username || !full_name || !email || !password) {
    return NextResponse.json(
      { msg: "400 Error: Missing/Malformed fields" },
      { status: 400 }
    );
  }

  const res: any = await insertUser(
    username,
    full_name,
    email,
    password
  )!;

  if (res.error) {
    return NextResponse.json({msg: res.error}, { status: res.status });
  }

  return NextResponse.json(res, { status: 201 });
}

export { GET, POST };
