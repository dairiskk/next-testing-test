// app/api/auth/register/route.ts
import { authSchema } from '@/lib/schemas/auth';
import { prisma } from '@/lib/prisma';
import { ApiError } from '@/lib/errors';
import { createApiHandler } from '@/lib/createApiHandler';
import bcrypt from 'bcryptjs';
import { signJwt } from '@/utils/jwt';
import { sendSuccess } from '@/lib/apiResponse';

export const POST = createApiHandler(authSchema, async (req, { email, password }) => {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new ApiError('Email already registered', 409);

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashed },
    });

    const token = signJwt({ id: user.id, email: user.email });
    return sendSuccess({ token }, 201);
});
