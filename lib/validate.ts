import { z } from 'zod';
import { ApiError } from './errors';

/**
 * Validates a JSON request body against a Zod schema.
 * Throws ApiError on failure.
 */
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
        throw new ApiError('Invalid or missing JSON in request body', 400);
    }

    if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
        throw new ApiError('Request body cannot be empty', 400);
    }

    const result = schema.safeParse(body);
    if (!result.success) {
        const message = result.error.issues.map((i) => i.message).join(', ');
        throw new ApiError(`Validation error: ${message}`, 400);
    }

    return result.data;
}
