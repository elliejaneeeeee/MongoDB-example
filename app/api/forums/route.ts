import { NextRequest, NextResponse } from "next/server";
import { fetchAllForums } from "../../../models/forum.models";

export async function GET(req: NextRequest) {
  try{
    const forums = await fetchAllForums();
    return NextResponse.json({ forums }, { status: 200 });
  }
  catch(error){
    return NextResponse.next()
  }
    
 
}

export default GET;
