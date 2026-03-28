import { NextResponse } from "next/server";
const locales = ['en', 'ar'];
const defaultLocale = 'en';
export function proxy(request) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;
    const pathWithoutLocale = pathname.replace(`/${locales.find(l => pathname.startsWith(`/${l}`))}`, '') || '/';
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    if (pathnameHasLocale) return;
    // Redirect user Authenticated to Home and away from Auth Pages
    if (token && (pathWithoutLocale === '/login' || pathWithoutLocale === '/signup')) {
        return NextResponse.rewrite(new URL(`/${locales.find(l => pathname.startsWith(`/${l}`))}/not-found`, request.url));
    }
    // Protect private Routes from unauthenticated users
    if (!token && pathWithoutLocale.startsWith('/dashboard')) {
        const loginUrl = new URL(`/${defaultLocale}/login`, request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (!pathnameHasLocale) {
        const url = new URL(`/${defaultLocale}${pathname}`, request.url);
        return NextResponse.redirect(url);
    }

    // allow the request to preceed if no conditions matchs
    return NextResponse.next();

}

export const config = {
matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif).*)'],}