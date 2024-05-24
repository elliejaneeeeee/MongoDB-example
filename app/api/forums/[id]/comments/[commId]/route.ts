import { NextRequest, NextResponse } from "next/server";
import { getForumPostById } from "../../../../../../models/forum.models";
import {
    deleteComment,
  patchComment,
  getCommentById,
} from "../../../../../../models/comments.models";
import {comments} from "./types";

export async function GET(req: NextRequest, {params}:{params: { id: string; commId: string }}) {
  const { id, commId } = params;
  try{
   const comment = await getCommentById(id, commId)
    return NextResponse.json({comment}, {status: 200})
  }catch(error: any){
    return NextResponse.json({msg: error.msg}, {status: error.status})
  }
}
export async function PATCH(
  req: any,
  { params }: { params: { id: string; commId: string } }
) {
  const { id, commId } = params;
  const patchBody = await req.json();
  
  try {
    
    const parsedBody = patchBody === 'string' ? await JSON.parse(patchBody) : patchBody
    const parsedVotes = parsedBody.inc_votes
    await getForumPostById(id); 
    await getCommentById(id, commId); 
    await patchComment(id, commId, parsedVotes); 
    const updatedComment: comments = await getCommentById(id, commId);  
    return NextResponse.json({response: {votes: updatedComment.votes}}, { status: 200 }) 
    
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  }
}
export async function DELETE(req: any,
    { params }: { params: { id: string; commId: string } }) {
      const  {id , commId} = params;
        try{
           await getForumPostById(id)
           await getCommentById(id, commId)
           const isDeleted: boolean = await deleteComment(id, commId)
           return isDeleted ? NextResponse.json({status: 200}) : Promise.reject({status: 500, msg: 'Server Error'})
        }catch(error: any){
        return NextResponse.json({ msg: error.msg }, { status: error.status })
        }
    }

