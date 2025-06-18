// app/api/protected/route.ts
import { handleApi } from '@/lib/handleApi';
import { getAuthUser } from '@/lib/getAuthUser';
import { sendSuccess } from '@/lib/apiResponse';

export const GET = handleApi(async (req) => {
    const user = getAuthUser(req);
    return sendSuccess({ message: 'Protected data access granted', user });
});
