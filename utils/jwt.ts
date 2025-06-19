// utils/jwt.ts
import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function signJwt(payload: object, expiresIn: SignOptions['expiresIn'] = '1h') {
    return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyJwt<T = JwtPayload>(token: string): T | null {
    try {
        return jwt.verify(token, SECRET) as T;
    } catch (err) {
        console.warn('[verifyJwt] Invalid token:', (err as Error).message);
        return null;
    }
}
