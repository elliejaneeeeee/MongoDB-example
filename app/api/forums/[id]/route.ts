import { NextRequest, NextResponse } from "next/server";
import { deleteItem, fetchById } from "../../../../models/utils";


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const post = await fetchById(id, {coll: "forums"});
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
    await fetchById(id, {coll: "forums"})
    await deleteItem(id, {coll: "forums"} );
    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  }
}
