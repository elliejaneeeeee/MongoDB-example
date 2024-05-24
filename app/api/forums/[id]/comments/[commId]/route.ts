import { NextRequest, NextResponse } from "next/server";
import { getForumPostById } from "../../../../../../models/forum.models";
import {
  patchComment,
  getCommentById,
} from "../../../../../../models/comments.models";

export async function PATCH(
  req: any,
  { params }: { params: { id: string; commId: string } }
) {
  const { id, commId } = params;
  console.log(id)
  const commentReq = await req.json();
  const parsedVotes = typeof commentReq === 'string' ? JSON.parse(commentReq).inc_votes : commentReq.inc_votes

  try {
    await getForumPostById(id); //checking to see if exists, throws error if not
    const originalComment = await getCommentById(id, commId); //checking to see if exists, throws error if not
    await patchComment(id, commId, parsedVotes); // does not return anything, just patches in database
    const updatedComment = await getCommentById(id, commId); // retrieves comment object to get new vote score
  
    if(updatedComment.votes !== originalComment.votes + parsedVotes){  // checks votes have changed
        return Promise.reject({status: 400})
    }
        return NextResponse.json({response: {votes: updatedComment.votes}}, { status: 200 }); // returns response obj with key of new vote score
   
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  }
}

