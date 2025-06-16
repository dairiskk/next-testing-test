import { createApiHandler } from '@/lib/createApiHandler';
import { authSchema } from '@/lib/schemas/auth';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { ApiError } from '@/lib/errors';

export const POST = createApiHandler(authSchema, async (req, { email, password }) => {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new ApiError('User already exists', 409);

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email,
            password: hashed,
        },
    });

    return NextResponse.json({ message: 'User registered successfully' });
});
