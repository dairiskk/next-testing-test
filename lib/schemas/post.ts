import { z } from 'zod';

export const postSchema = z.object({
    content: z.string().min(1, 'Content is required'),
    imageUrl: z.string().url('Invalid image URL').optional(),
});
