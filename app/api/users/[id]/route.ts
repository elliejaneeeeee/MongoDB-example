import { NextRequest, NextResponse } from "next/server";
import { deleteItem, fetchById } from "../../../../models/utils";
import { patchUserBookmarks } from "../../../../models/users.models";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const user: any = await fetchById(id, {coll: "users"})
        return NextResponse.json({ user }, {status: 200})
    } catch (error: any) {
        return NextResponse.json({ msg: error.msg }, { status: error.status });
    }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }){
    const { id } = params;
  try {
    await fetchById(id, {coll: "users"});
    await deleteItem(id, {coll: "users"} );
    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status });
  }
}

export async function PATCH(req: any, { params }: { params: { id: string } }){
  const {id} = params;
  const reqBody = await req.json()
  const bodyString =
  reqBody === "string" ? reqBody : JSON.stringify(reqBody);
  try {
    await fetchById(id, {coll: 'users'})
    await patchUserBookmarks(id, bodyString)
    return NextResponse.json({status: 200})
  }
  catch(error: any)
  {
    return NextResponse.json({ msg: error.msg }, { status: error.status });}
}