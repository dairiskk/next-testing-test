// lib/handleApi.ts
import { NextResponse } from 'next/server';
import { ApiError } from './errors';
import { Prisma } from '@prisma/client';

export function handleApi<T extends (req: Request) => Promise<Response>>(handler: T) {
    return async (req: Request): Promise<Response> => {
        try {
            return await handler(req);
        } catch (err: any) {
            let status = 500;
            let message = 'Internal server error';

            if (err instanceof ApiError) {
                status = err.status;
                message = err.message;
            } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
                // e.g. unique constraint failed
                if (err.code === 'P2002') {
                    status = 409;
                    message = 'Duplicate entry: ' + (err.meta?.target ?? 'unknown');
                }
            } else if (err instanceof Prisma.PrismaClientValidationError) {
                status = 400;
                message = 'Invalid data sent to database';
            } else if (err instanceof Prisma.PrismaClientInitializationError) {
                status = 500;
                message = 'Database initialization failed';
            }

            console.error('[API ERROR]', err);

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
