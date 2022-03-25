import {NextResponse} from "next/server";
import {API_URL, NEXT_URL} from "@/config/index";

export async function middleware(req) {
    const token = req.cookies['token']
    if (token) {
        const res = NextResponse.next();
        const getOrdersUser = await fetch(`${API_URL}/orders/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const userOrders = await getOrdersUser.json();
        // check if user token correct
        if (userOrders.statusCode === 401) return NextResponse.redirect(NEXT_URL);
        res.cookie('AllUserOrder', JSON.stringify(userOrders))
        return res
    }
    return NextResponse.redirect(NEXT_URL);
}