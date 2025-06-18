// lib/createApiHandler.ts
import { z } from 'zod';
import { handleApi } from './handleApi';
import { validateBody } from './validate';

export function createApiHandler<T extends z.ZodTypeAny>(
    schema: T,
    handler: (req: Request, data: z.infer<T>) => Promise<Response>
) {
    return handleApi(async (req) => {
        const parsed = await validateBody(req, schema);
        return handler(req, parsed);
    });
}
