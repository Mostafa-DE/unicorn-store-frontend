import {NextResponse} from "next/server";
import {API_URL, NEXT_URL} from "@/config/index";

export async function middleware(req) {
    const protectedRoutes = {
        Login: "/account/login",
        Register: "/account/register",
        CheckoutLogin: "/account/checkout-login",
        MyAccount: "/account/my-account",
        DashboardUser: "/account/dashboard-user",
        ForgotPassword: "/account/forgot-password",
        WishList: "/products/wish-list"
    }
    const token = req.cookies['token']
    const pageName = req.page.name

    if (pageName === protectedRoutes.Login ||
        pageName === protectedRoutes.Register ||
        pageName === protectedRoutes.ForgotPassword
    ) {
        if (token) {
            return NextResponse.redirect(NEXT_URL);
        }
        return NextResponse.next()
    }

    if (pageName === protectedRoutes.CheckoutLogin) {
        if (token) {
            return NextResponse.redirect(`${NEXT_URL}/payment/shipping-info`);
        }
        return NextResponse.next()
    }

    if (
        pageName === protectedRoutes.MyAccount ||
        pageName === protectedRoutes.DashboardUser ||
        pageName === protectedRoutes.WishList
    ) {
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
}