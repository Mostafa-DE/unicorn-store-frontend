import type {NextRequest} from 'next/server'
import {NextResponse} from "next/server";
import {NEXT_URL} from "@/config/index";


export async function middleware(req: NextRequest) {
    const PUBLIC_FILE = /\.(.*)$/; // regex to match public files
    const {pathname} = req.nextUrl;
    // This condition is to exclude specific routes from the middleware
    // without this condition, the middleware will be applied to all routes
    // And you will get an error if you try to access any of these routes
    if (
        pathname.startsWith("/_next") || // exclude Next.js internals
        pathname.startsWith("/api") || //  exclude all API routes
        pathname.startsWith("/static") || // exclude static files
        PUBLIC_FILE.test(pathname) // exclude all files in the public folder
    ) {
        return NextResponse.next();
    }

    const token = req.cookies.get('token')?.value;
    const pageName = req.nextUrl.pathname;
    const handleRoute =
        (suffix = '') => token ? NextResponse.redirect(`${NEXT_URL}${suffix}`) : NextResponse.next()

    const handleRouteWithUser = async (suffix) => {
        if (token) return NextResponse.next();

        return NextResponse.redirect(`${NEXT_URL}${suffix}`);
    }

    const protectedRoutes = {
        "/account/login": () => handleRoute(),
        "/account/register": () => handleRoute(),
        "/account/checkout-login": () => handleRoute('/payment/shipping-info'),
        "/account/my-account": () => handleRouteWithUser('/account/login'),
        "/account/dashboard-user": () => handleRouteWithUser('/account/login'),
        "/account/forgot-password": () => handleRoute(),
        "/products/wish-list": () => handleRouteWithUser('/account/login'),
    }
    const protectedRoute = protectedRoutes[pageName]
    return protectedRoute ? protectedRoute() : NextResponse.next();
}
