// lib/createApiHandler.ts
import { z } from 'zod';
import { ApiError } from './errors';
import { sendError } from './apiResponse';
import { Prisma } from '@prisma/client';

type WithBody<T extends z.ZodTypeAny> = (req: Request, body: z.infer<T>) => Promise<Response>;
type NoBody = (req: Request) => Promise<Response>;

export function createApiHandler<T extends z.ZodTypeAny>(
    schema: T,
    handler: WithBody<T>
): (req: Request) => Promise<Response>;

export function createApiHandler(
    schema: undefined,
    handler: NoBody
): (req: Request) => Promise<Response>;

export function createApiHandler(
    schema: z.ZodTypeAny | undefined,
    handler: any
): (req: Request) => Promise<Response> {
    return async (req) => {
        try {
            let parsedBody: any = undefined;

            if (schema) {
                const contentType = req.headers.get('content-type') || '';
                if (!contentType.includes('application/json')) {
                    throw new ApiError('Content-Type must be application/json', 415);
                }

                const body = await req.json();
                const parsed = schema.safeParse(body);
                if (!parsed.success) {
                    throw new ApiError('Invalid request body', 400, parsed.error.issues);
                }

                parsedBody = parsed.data;
            }

            return schema ? await handler(req, parsedBody) : await handler(req);
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
