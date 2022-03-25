import {NextResponse} from "next/server";
import {API_URL, NEXT_URL} from "@/config/index";

export async function middleware(req) {
    const token = req.cookies['token']
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
        res.cookie('user', JSON.stringify(currentUser))
        return res
    }
    return NextResponse.redirect(NEXT_URL);
}