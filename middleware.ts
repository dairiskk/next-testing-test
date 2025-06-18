// middleware.ts  – Edge runtime
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // allow public routes
    if (path.startsWith('/api/auth') || path.startsWith('/auth')) {
        return NextResponse.next();
    }

    // only check that a Bearer token string exists
    const hasBearer = /^Bearer\s.+$/i.test(req.headers.get('authorization') || '');
    if (!hasBearer) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next();     // route does full verify
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
