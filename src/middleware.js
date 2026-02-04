import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;
    
    // Redirect user Authenticated to Home and away from Auth Pages
    if(token && (pathname === '/login' || pathname === '/signup')) {
        // return NextResponse.redirect(new URL('/', request.url));
        return NextResponse.rewrite(new URL('not-found', request.url))
    }

    // Protect private Routes from unauthenticated users
    if(!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // allow the request to preceed if no conditions matchs
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}