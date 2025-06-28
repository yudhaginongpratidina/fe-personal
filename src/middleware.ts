import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookie } from '@/utils/cookies'

export async function middleware(req: NextRequest) {

    if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
        const authenticated = await getCookie('authenticated');
        if (authenticated) { return NextResponse.redirect(new URL('/account', req.url)); }
    }
    
    const protectedPaths = [
        '/account',
    ];
    
    const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(`${path}/`));
    if (isProtectedPath) {
        try {
            const authenticated = await getCookie('authenticated');
            if (!authenticated) { return NextResponse.redirect(new URL('/login', req.url)); }
        } catch (error) {
            console.error("Error in middleware:", error);
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/account',
    ],
};