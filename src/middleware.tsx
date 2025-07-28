import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environtment from "./config/env";

export async function middleware(request: NextRequest) {
    const token : JWTExtended | null = await getToken({
        req: request,
        secret:  environtment.AUTH_SECRET,
    });

    const { pathname } = request.nextUrl;

    if (pathname === '/auth/login' || pathname === 'auth/register') {
        if (token) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (pathname.startsWith('/admin')) {
        if (!token) {
            const url = new URL('/auth/login', request.url); //request.url is a base URL example: http://localhost:3000/ continued with relative path so https://localhost:3000/auth/login
            url.searchParams.set('callbackUrl', encodeURI(request.url)); // set callbackUrl to redirect user after login (so they can continue to the page they were trying to access)
            return NextResponse.redirect(url);
        }
    }

    if (token?.user?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    if (pathname === '/member') {
        return NextResponse.redirect(new URL('/member/dashboard', request.url));
    }
}

export const config = {
    matcher : ['/auth/:path*', '/admin/:path*'],
}