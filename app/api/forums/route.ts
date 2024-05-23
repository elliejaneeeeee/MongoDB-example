import { NextRequest, NextResponse } from "next/server";
import { fetchAllForums, postToForum } from "../../../models/forum.models";


export async function GET(req: NextRequest) {
  try {
    const forums = await fetchAllForums();
    return NextResponse.json({ forums }, { status: 200 });
  } catch (error) {
    return NextResponse.next();
  }
}
export async function POST(req: any) {
  const post = await req.json();
  try {
    const postData = await postToForum(typeof post === 'string' ? post : JSON.stringify(post) );
    return NextResponse.json({ postData }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ msg: 'Bad Request' }, {status: 400});
  }
}
