import {NextResponse} from "next/server";
import {API_URL, NEXT_URL} from "@/config/index";
import type {NextRequest} from 'next/server'


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

    // Handle protected routes
    const token = req.cookies.get('token')?.value;
    const pageName = req.nextUrl.pathname;
    const handleRoute =
        (suffix = '') => token ? NextResponse.redirect(`${NEXT_URL}${suffix}`) : NextResponse.next()

    const handleRouteWithUser = async (suffix) => {
        if (token) {
            const res = NextResponse.next();
            const getCurrentUser = await fetch(`${API_URL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const currentUser = await getCurrentUser.json();
            if (currentUser.statusCode === 401) return NextResponse.redirect(NEXT_URL);
            res.cookies.set('user', JSON.stringify(currentUser))
            return res
        }
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
    if (protectedRoute) return protectedRoute();

    // Handle upcoming pages
    const upcomingRoutes = [
        "men-fashions/men-pajamas/pajamas",
        "men-fashions/all-products/other-products",
        "kids-fashions/kids-pajamas/pajamas",
        "kids-fashions/kids-dresses/dresses",
        "kids-fashions/all-products/other-products",
        "accessories/women/women-necklace/necklace",
        "accessories/women/women-rings/rings",
        "accessories/women/women-bracelets/bracelets",
        "accessories/women/all-products/other-products",
        "accessories/men/men-watches/watches",
        "accessories/men/all-products/other-products",
        "accessories/kids/all-products/products",
        "makeup/products",
        "packages/products",
        "houseware/products",
    ]

    const upcomingRoute = upcomingRoutes.find((route) => pathname.includes(route))
    if (upcomingRoute) return NextResponse.rewrite(`${NEXT_URL}/coming-soon`);

    return NextResponse.next();
}
