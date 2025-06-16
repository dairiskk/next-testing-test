import { NextResponse } from 'next/server';
import {verifyJwt} from "@/utils/jwt";

export async function GET(req: Request) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = verifyJwt(token);
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 403 });

    return NextResponse.json({ message: 'This is protected data', user: payload });
}
