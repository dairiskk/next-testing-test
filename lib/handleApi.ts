import { NextResponse } from 'next/server';
import { ApiError } from './errors';

export function handleApi<T extends (req: Request) => Promise<Response>>(handler: T) {
    return async (req: Request): Promise<Response> => {
        try {
            return await handler(req);
        } catch (err: any) {
            const status = err instanceof ApiError ? err.status : 500;
            const message = err instanceof ApiError ? err.message : 'Internal server error';

            console.error('API Error:', err);

            return NextResponse.json(
                {
                    error: message,
                    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
                },
                { status }
            );
        }
    };
}
