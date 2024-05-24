import { NextRequest, NextResponse } from "next/server";

import {
  deleteComment,
  patchComment,
  getCommentById,
} from "../../../../../../models/comments.models";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; commId: string } }
) {
  const { id, commId } = params;
  try {
    const comment = await getCommentById(id, commId);
    return NextResponse.json({ comment }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  }
}
export async function PATCH(
  req: any,
  { params }: { params: { id: string; commId: string } }
) {
  const { id, commId } = params;
  const reqBody = await req.json();

  try {
    const parsedBody =
      reqBody === "string" ? await JSON.parse(reqBody) : reqBody;
    const votesToAdd: number = parsedBody.inc_votes;
    await getCommentById(id, commId);
    await patchComment(id, commId, votesToAdd);
    const updatedComment = await getCommentById(id, commId);
    return NextResponse.json(
      { comment: { votes: updatedComment.votes } }, //returns {comment: {votes: num}}
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  }
}
export async function DELETE(
  req: any,
  { params }: { params: { id: string; commId: string } }
) {
  const { id, commId } = params;
  try {
    await getCommentById(id, commId);
    await deleteComment(id, commId);
      return NextResponse.json({ status: 200 })  
      
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  }
}
