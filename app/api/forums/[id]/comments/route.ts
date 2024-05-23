import { NextRequest, NextResponse } from "next/server";
import { getForumPostById, postComment } from "../../../../../models/forum.models";

export async function POST( req: any,
    { params }: { params: { id: string } }){
        const { id } = params;
        const commentReq = await req.json()
  try {
    await getForumPostById(id)
    const comment = await postComment(id, typeof commentReq === 'string' ? commentReq : JSON.stringify(commentReq) )
    return NextResponse.json({ comment }, { status: 201})
  }catch(error: any){
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  };
    }