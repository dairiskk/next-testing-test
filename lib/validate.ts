// lib/validate.ts
import { z } from 'zod';
import { ApiError } from './errors';

export async function validateBody<T extends z.ZodTypeAny>(
    req: Request,
    schema: T
): Promise<z.infer<T>> {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
        throw new ApiError('Content-Type must be application/json', 415);
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        throw new ApiError('Invalid JSON body', 400);
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
        throw new ApiError('Validation failed', 422, parsed.error.format());
    }

    return parsed.data;
}
