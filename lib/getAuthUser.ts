// lib/getAuthUser.ts
import { verifyJwt } from '@/utils/jwt';
import { ApiError } from './errors';

export function getAuthUser<T = any>(req: Request): T {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) throw new ApiError('Missing token', 401);

    const user = verifyJwt<T>(token);
    if (!user) throw new ApiError('Invalid token', 403);

    return user;
}
