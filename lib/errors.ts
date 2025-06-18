// lib/errors.ts
export class ApiError extends Error {
    constructor(
        public message: string,
        public status: number = 500,
        public issues?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}
