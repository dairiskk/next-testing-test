/**
 * @jest-environment node
 */
import { fetchRoute } from './_fetchRoute';
import { POST as registerHandler } from '@/app/api/auth/register/route';
import { POST as loginHandler }    from '@/app/api/auth/login/route';
import { verifyJwt } from '@/utils/jwt';
import { prisma } from '@/lib/prisma';

// 🧠 Mock Prisma with working in-memory users + hashed passwords
jest.mock('@/lib/prisma', () => {
    const users: any[] = [];

    return {
        prisma: {
            user: {
                create: jest.fn(async ({ data }) => {

                    const user = { ...data, id: users.length + 1, password: data.password };
                    users.push(user);
                    return user;
                }),
                findUnique: jest.fn(({ where: { email } }) =>
                    users.find((u) => u.email === email) ?? null,
                ),
            },
        },
    };
});

describe('Auth API', () => {
    const email = `user${Date.now()}@example.com`;
    const password = 'test123';

    it('registers a new user', async () => {
        const res = await fetchRoute(registerHandler, 'POST', { email, password });
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json.statusCode).toBe(200);
        expect(json.data?.message).toMatch(/registered/i);
        expect(prisma.user.create).toHaveBeenCalled();
    });

    it('rejects duplicate registration', async () => {
        const res = await fetchRoute(registerHandler, 'POST', { email, password });
        const json = await res.json();

        expect(res.status).toBe(409);
        expect(json.error).toMatch(/exists|duplicate/i);
    });

    it('logs in with valid credentials', async () => {
        // ensure the user is registered (again, due to fresh module state)
        await fetchRoute(registerHandler, 'POST', { email: 'login@test.com', password: 'pass123' });

        const res = await fetchRoute(loginHandler, 'POST', {
            email: 'login@test.com',
            password: 'pass123',
        });
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json.statusCode).toBe(200);
        const token = json.data?.token;
        expect(token).toBeDefined();

        const payload = verifyJwt<{ email: string }>(token);
        expect(payload?.email).toBe('login@test.com');
    });

    it('rejects wrong password', async () => {
        const res = await fetchRoute(loginHandler, 'POST', {
            email: 'login@test.com',
            password: 'wrongpassword',
        });
        const json = await res.json();

        expect(res.status).toBe(401);
        expect(json.error).toMatch(/invalid/i);
    });
});
