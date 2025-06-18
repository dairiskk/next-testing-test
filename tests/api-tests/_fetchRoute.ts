/**
 * Creates a mock Request and passes it to your App Router handler.
 */
export const fetchRoute = async (
    handler: (req: Request) => Promise<Response>,
    method: 'GET' | 'POST' = 'POST',
    body?: unknown,
    headers: Record<string, string> = {},
) => {
    return handler(
        new Request('http://localhost/test', {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        }),
    );
};
