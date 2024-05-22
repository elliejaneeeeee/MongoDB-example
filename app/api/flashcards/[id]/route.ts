import { NextRequest, NextResponse } from "next/server";
import { getFlashcardByID } from "../../../../models/flashcards.model";


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const flashcards = await getFlashcardByID(id);

    return NextResponse.json({ flashcards }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.msg }, { status: error.status }); 
  }
}
