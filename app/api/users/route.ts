import { NextRequest, NextResponse } from "next/server";
import { fetchAll, insertUser } from "../../../models/utils";

async function GET(req: NextRequest) {
  const users = await fetchAll({coll: 'users'})
  return NextResponse.json({ users } , {status: 200 })
}

async function POST(req: Request) {
  const parsedRequest = await req.json();
  try {
    const { username, full_name, email, password } = parsedRequest.body;

    const res: any = await insertUser(username, full_name, email, password)!;

    return NextResponse.json(res, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "400 Error: Bad Request!" },
      { status: 400 }
    );
  }
}

export { GET, POST };
