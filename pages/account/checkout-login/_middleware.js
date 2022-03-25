import {NextResponse} from "next/server";
import {NEXT_URL} from "@/config/index";

export async function middleware(req) {
    const token = req.cookies['token']
    if (token) {
        return NextResponse.redirect(`${NEXT_URL}/payment/shipping-info`);
    }
    return NextResponse.next()
}