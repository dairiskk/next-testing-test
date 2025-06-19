import { prisma } from '@/lib/prisma';
import { createApiHandler } from '@/lib/createApiHandler';
import { postSchema } from '@/lib/schemas/post';
import { getAuthUser } from '@/lib/getAuthUser';
import { sendSuccess } from '@/lib/apiResponse';
import { ApiError } from '@/lib/errors';

// PUT /api/posts/[id]
export const PUT = createApiHandler(postSchema, async (req, body) => {
    const user = getAuthUser(req);
    const url = new URL(req.url);
    const id = parseInt(url.pathname.split('/').pop() || '', 10);

    if (isNaN(id)) throw new ApiError('Invalid post ID', 400);

    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost || existingPost.authorId !== user.id) {
        throw new ApiError('Not authorized to update this post', 403);
    }

    const updated = await prisma.post.update({
        where: { id },
        data: {
            content: body.content,
            imageUrl: body.imageUrl,
        },
    });

    return sendSuccess(updated);
});

// DELETE /api/posts/[id]
export async function DELETE(req: Request) {
    const user = getAuthUser(req);
    const url = new URL(req.url);
    const id = parseInt(url.pathname.split('/').pop() || '', 10);

    if (isNaN(id)) throw new ApiError('Invalid post ID', 400);

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post || post.authorId !== user.id) {
        throw new ApiError('Not authorized to delete this post', 403);
    }

    await prisma.post.delete({ where: { id } });

    return sendSuccess({ message: 'Post deleted' });
}
