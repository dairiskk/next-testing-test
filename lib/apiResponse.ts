// lib/apiResponse.ts
import { NextResponse } from 'next/server';

type ApiSuccess<T> = {
    statusCode: number;
    data: T;
};

type ApiErrorResponse = {
    statusCode: number;
    error: string;
    issues?: unknown;
    stack?: string;
};

export function sendSuccess<T>(data: T, statusCode: number = 200): NextResponse {
    return NextResponse.json<ApiSuccess<T>>({ statusCode, data }, { status: statusCode });
}

export function sendError(
    message: string,
    statusCode: number = 500,
    issues?: unknown,
    err?: unknown
): NextResponse {
    const error: ApiErrorResponse = {
        statusCode,
        error: message,
        ...(issues && { issues }),
        ...(process.env.NODE_ENV === 'development' && err instanceof Error && { stack: err.stack }),
    };

    return NextResponse.json(error, { status: statusCode });
}
