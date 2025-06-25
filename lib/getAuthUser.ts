
import { ApiError } from './errors';
import {verifyJwt} from "@/utils/jwt";

export function getAuthUser<T = { id: number; email: string }>(req: Request): T {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const user = token ? verifyJwt<T>(token) : null;

    if (!user) {
        throw new ApiError('Unauthorized: Invalid or missing token', 401);
    }

    return user;
}