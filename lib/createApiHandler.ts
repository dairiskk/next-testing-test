// lib/createApiHandler.ts
import { z } from 'zod';
import { ApiError } from './errors';
import { sendError } from './apiResponse';
import { Prisma } from '@prisma/client';

export function createApiHandler<T extends z.ZodTypeAny>(
    schema: T,
    handler: (req: Request, body: z.infer<T>) => Promise<Response>
): (req: Request) => Promise<Response> {
    return async (req) => {
        try {
            if (req.headers.get('content-type')?.includes('application/json') !== true) {
                throw new ApiError('Content-Type must be application/json', 415);
            }

            const body = await req.json();
            const parsed = schema.safeParse(body);
            if (!parsed.success) {
                throw new ApiError('Invalid request body', 400, parsed.error.issues);
            }

            return await handler(req, parsed.data);
        } catch (err: any) {
            let status = 500;
            let message = 'Internal server error';
            let issues;

            if (err instanceof ApiError) {
                status = err.status;
                message = err.message;
                issues = err.issues;
            } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    status = 409;
                    message = `Duplicate entry for unique field(s): ${err.meta?.target}`;
                }
            } else if (err instanceof Prisma.PrismaClientValidationError) {
                status = 400;
                message = 'Invalid data sent to the database.';
            }

            console.error('[API ERROR]', err);
            return sendError(message, status, issues, err);
        }
    };
}
