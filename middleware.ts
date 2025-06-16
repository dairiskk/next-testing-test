// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './utils/jwt';

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Allow public routes
    if (path.startsWith('/api/auth') || path.startsWith('/auth')) {
        return NextResponse.next();
    }

    // Check for JWT in Authorization header
    const token = req.headers.get('authorization')?.split(' ')[1];
    const isValid = token && verifyJwt(token);

    if (!isValid) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
