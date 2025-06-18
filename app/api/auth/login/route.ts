// app/api/auth/login/route.ts
import { createApiHandler } from '@/lib/createApiHandler';
import { authSchema } from '@/lib/schemas/auth';
import { prisma } from '@/lib/prisma';
import { ApiError } from '@/lib/errors';
import { signJwt } from '@/utils/jwt';
import bcrypt from 'bcryptjs';
import { sendSuccess } from '@/lib/apiResponse';

export const POST = createApiHandler(authSchema, async (req, { email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new ApiError('Invalid email or password', 401);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new ApiError('Invalid email or password', 401);

    const token = signJwt({ id: user.id, email: user.email });
    return sendSuccess({ token });
});
