import { authSchema } from '@/lib/schemas/auth';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { ApiError } from '@/lib/errors';
import { signJwt } from '@/utils/jwt';
import { createApiHandler } from '@/lib/createApiHandler'; // ✅ missing import added

export const POST = createApiHandler(authSchema, async (req, { email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new ApiError('Invalid email or password', 401);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new ApiError('Invalid email or password', 401);
    }

    const token = signJwt({ email: user.email, id: user.id }); // ✅ include ID if needed

    return NextResponse.json({ token });
});
