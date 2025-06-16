import { z } from 'zod';
import { NextResponse } from 'next/server';
import { ApiError } from './errors';
import { Prisma } from '@prisma/client';

/**
 * Wraps a handler with schema validation + error handling.
 */
export function createApiHandler<T extends z.ZodTypeAny>(
    schema: T,
    handler: (req: Request, body: z.infer<T>) => Promise<Response>
) {
    return async (req: Request): Promise<Response> => {
        try {
            // Parse body
            const contentType = req.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
                throw new ApiError('Content-Type must be application/json', 415);
            }

            const body = await req.json();
            const parsed = schema.safeParse(body);

            if (!parsed.success) {
                throw new ApiError('Validation failed', 422, parsed.error.format());
            }

            return await handler(req, parsed.data);
        } catch (err: any) {
            let status = 500;
            let message = 'Internal server error';

            if (err instanceof ApiError) {
                status = err.status;
                message = err.message;
            } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
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
                    ...(err.issues && { issues: err.issues }),
                    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
                },
                { status }
            );
        }
    };
}
