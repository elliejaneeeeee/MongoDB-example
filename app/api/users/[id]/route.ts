import { NextRequest, NextResponse } from "next/server";
import { fetchUserById } from "../../../../models/users.models";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const user: any = await fetchUserById(id)
        
        if (user.error) {
            return NextResponse.json({ error: user.error } , {status: user.status })
        }
        
        return NextResponse.json({ user }, {status: 200})
    } catch (error) {
        return NextResponse.json({ error })
    }
}
