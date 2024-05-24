import { NextRequest, NextResponse } from "next/server";

async function GET(req: NextRequest) {
    return NextResponse.json(
        { error: "404 Error: Resource doesn't exist" },
        { status: 404 }
    );
}

export { GET };
