import { NextRequest, NextResponse } from "next/server";
import { getForumPostById, deleteForumPost } from "../../../../models/forum.models";
import { error } from "console";


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const post = await getForumPostById(id);
    return NextResponse.json({ post }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }){
  const { id } = params;
  try {
    await getForumPostById(id);
    const isDeleted: boolean = await deleteForumPost(id)
    return isDeleted ? NextResponse.json({ status: 200 }) : Promise.reject({status: 500, msg: 'Server Error'})
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  }
}

