
import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/createApiHandler';
import { getAuthUser } from '@/lib/getAuthUser';
import { postSchema } from '@/lib/schemas/post';
import { sendSuccess } from '@/lib/apiResponse';

// GET /api/posts — List all posts
export async function GET(req: Request) {
    const user = getAuthUser(req); // ensures token is valid
    const posts = await prisma.post.findMany({
        include: {
            author: { select: { id: true, name: true, email: true } },
            comments: true,
            likes: true,
        },
        orderBy: { createdAt: 'desc' },
    });

    return sendSuccess(posts);
}

export const POST = createApiHandler(postSchema, async (req, body) => {
    const user = getAuthUser(req);

    const newPost = await prisma.post.create({
        data: {
            caption: body.caption ?? null,
            imageUrl: body.imageUrl ?? null,
            authorId: user.id,
        },
    });

    return sendSuccess(newPost, 201);
});
