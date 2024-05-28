import { fetchById, patchItem } from "../../../../models/utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: any,
    { params }: { params: { id: string} }
  ) {
    const { id } = params;
    const reqBody = await req.json();
  
    try {
      const parsedBody =
        reqBody === "string" ? await JSON.parse(reqBody) : reqBody;
      const votesToAdd: number = parsedBody.inc_votes;
      await fetchById(id, {coll: 'articles'});
      const articleUpdated = await patchItem(id, votesToAdd, {coll: 'articles'});
     
      return NextResponse.json(
        { article: { votes: articleUpdated.votes } }, //returns {article: {votes: num}}
        { status: 200 }
      );
    } catch (error: any) {
       
      return NextResponse.json({ msg: error.msg }, { status: error.status });
    }
  }