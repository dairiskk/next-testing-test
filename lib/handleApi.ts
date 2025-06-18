// lib/handleApi.ts
import { ApiError } from './errors';
import { Prisma } from '@prisma/client';
import { sendError } from './apiResponse';

export function handleApi(handler: (req: Request) => Promise<Response>) {
    return async (req: Request): Promise<Response> => {
        try {
            return await handler(req);
        } catch (err: any) {
            if (err instanceof ApiError) {
                return sendError(err.message, err.status, err.issues, err);
            }

            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
                return sendError('Duplicate entry: ' + (err.meta?.target ?? 'unknown'), 409, undefined, err);
            }

            if (err instanceof Prisma.PrismaClientValidationError) {
                return sendError('Invalid data sent to database', 400, undefined, err);
            }

            return sendError('Internal server error', 500, undefined, err);
        }
    };
}
