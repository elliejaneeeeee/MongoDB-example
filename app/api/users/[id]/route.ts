import { NextRequest, NextResponse } from "next/server";
import connect from "../../../../lib/index";
import { ObjectId } from "mongodb";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { msg: "Invalid ID format" },
                { status: 400 }
            );
        }


        const userId = new ObjectId(id);

        const client = await connect();
        const db = client.db("test");

        const result = await db.collection("users").findOne({ _id: userId });

        if (!result) {
            return NextResponse.json(
                { msg: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ msg: result }, { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json(
            { msg: (error as Error).message },
            { status: 500 }
        );
    }
}
