import {NextResponse} from "next/server";
import {API_URL, NEXT_URL} from "@/config/index";


export async function middleware(req) {
    try {
        await fetch(API_URL);
        const token = req.cookies['token']
        const pageName = req.page.name
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
                res.cookie("user", JSON.stringify(currentUser))
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
        return protectedRoute ? protectedRoute() : NextResponse.next();
    } catch (err) {
        return NextResponse.rewrite(`${NEXT_URL}/503`)
    }

}
