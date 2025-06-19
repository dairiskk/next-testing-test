import { authSchema } from '@/lib/schemas/auth';
import { prisma } from '@/lib/prisma';
import { ApiError } from '@/lib/errors';
import { createApiHandler } from '@/lib/createApiHandler';
import bcrypt from 'bcryptjs';
import { signJwt } from '@/utils/jwt';
import { sendSuccess } from '@/lib/apiResponse';

export const POST = createApiHandler(authSchema, async (req, { email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new ApiError('Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError('Invalid email or password', 401);
    }

    const token = signJwt({ id: user.id, email: user.email });
    return sendSuccess({ token });
});
