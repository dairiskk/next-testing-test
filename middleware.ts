// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

function decodeJwt(token: string): any | null {
    try {
        const payloadBase64 = token.split('.')[1];
        const payload = atob(payloadBase64);
        return JSON.parse(payload);
    } catch {
        return null;
    }
}

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    if (path.startsWith('/api/auth')) {
        return NextResponse.next();
    }

    if (path.startsWith('/api')) {
        const token = req.headers.get('authorization')?.split(' ')[1];
        const user = token ? decodeJwt(token) : null;

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log('[MIDDLEWARE] allowed:', user.email || user.id);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*'],
};
