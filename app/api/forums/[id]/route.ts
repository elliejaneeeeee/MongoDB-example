import { NextRequest, NextResponse } from "next/server";
import {
  getForumPostById,
  deleteForumPost,
} from "../../../../models/forum.models";


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const post = await getForumPostById(id);
    return NextResponse.json({ post } , { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await getForumPostById(id);
    await deleteForumPost(id);
    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  }
}
