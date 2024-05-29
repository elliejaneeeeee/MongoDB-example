import { NextRequest, NextResponse } from "next/server";
import { postToForum } from "../../../models/forum.models";
import { fetchAll } from "../../..//models/utils";

export async function GET(req: NextRequest) {
  try {
    const forums: Array<{}> = await fetchAll({coll: 'forums'});
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
