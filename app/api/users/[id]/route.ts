import { NextRequest, NextResponse } from "next/server";
import { deleteItem, fetchById } from "../../../../models/utils";
import { patchUserBookmarks } from "../../../../models/users.models";
import { fetchUserById, updateUser } from "../../../../models/users.models";
import { usersSchema } from "../../../../lib/seed/seed";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const user: any = await fetchUserById(id);

    if (user.error) {
      return NextResponse.json({ error: user.error }, { status: user.status });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PATCH(req: NextRequest,{ params }: { params: { id: string } }) {
  const fields = await req.json();
  const { id } = params;
  
  const allowedFields: string[] = Object.keys(usersSchema.properties);

  for (const key in fields) {
    if (!allowedFields.includes(key)) {
      delete fields[key];
    }
  }

  try {
    const updatedUser = await updateUser(id, fields);
    
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    if( error.status ) {
        return NextResponse.json({ error: error.status.msg }, { status: error.status.code });
    }
    return NextResponse.json({ error: "404 Not Found" }, { status: 404 });
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
