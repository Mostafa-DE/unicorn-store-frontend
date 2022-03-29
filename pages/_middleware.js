import {NextResponse} from "next/server";
import {API_URL, NEXT_URL} from "@/config/index";

export async function middleware(req) {
    const token = req.cookies['token']
    const pageName = req.page.name
    const handleRoute =
        (postfix = '') => token ? NextResponse.redirect(`${NEXT_URL}${postfix}`) : NextResponse.next()

    const handleRouteWithUser = async () => {
        if (token) {
            const res = NextResponse.next();
            const getCurrentUser = await fetch(`${API_URL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const currentUser = await getCurrentUser.json();
            // check if user token correct
            if (currentUser.statusCode === 401) return NextResponse.redirect(NEXT_URL);
            res.cookie("user", JSON.stringify(currentUser))
            return res
        }
        return NextResponse.redirect(NEXT_URL);
    }

    const protectedRoutes = {
        "/account/login": () => handleRoute(),
        "/account/register": () => handleRoute(),
        "/account/checkout-login": () => handleRoute('/payment/shipping-info'),
        "/account/my-account": () => handleRouteWithUser(),
        "/account/dashboard-user": () => handleRouteWithUser(),
        "/account/forgot-password": () => handleRoute(),
        "/products/wish-list": () => handleRouteWithUser(),
    }
    const protectedRoute = protectedRoutes[pageName]
    //check if the route was in protectedRoutes Obj
    return protectedRoute ? protectedRoute() : NextResponse.next();
}