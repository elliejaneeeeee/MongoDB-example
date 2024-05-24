import { NextRequest, NextResponse } from "next/server";
import {
  getCommentById,
  postComment,
} from "../../../../../models/comments.models";
import { fetchById } from "../../../../../models/utils";

export async function POST(req: any, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const reqBody = await req.json();
    await fetchById(id, {coll: 'forums'});
    const commId = await postComment(
      id,
      typeof reqBody === "string" ? reqBody : JSON.stringify(reqBody)
    ); //returns comment ID of inserted comment
    const comment = await getCommentById(id, commId); 
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  }
}
