// lib/getAuthUser.ts
import { verifyJwt } from '@/utils/jwt';
import { ApiError } from './errors';

export function getAuthUser<T = { id: number; email: string }>(req: Request): T {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const user = token ? verifyJwt<T>(token) : null;

    if (!user) throw new ApiError('Invalid token', 403);
    return user;
}
