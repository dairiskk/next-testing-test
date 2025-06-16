import jwt, { SignOptions } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function signJwt(payload: object, expiresIn: SignOptions['expiresIn'] = '1h') {
    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, SECRET, options);
}

export function verifyJwt<T = never>(token: string): T | null {
    try {
        return jwt.verify(token, SECRET) as T;
    } catch (err) {
        return null;
    }
}