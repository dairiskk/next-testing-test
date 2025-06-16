import { NextResponse } from 'next/server';
import {getAuthUser} from "@/lib/getAuthUser";

export async function GET(req: Request) {
    return NextResponse.json({ message: 'This is protected data', user: getAuthUser(req) });
}
