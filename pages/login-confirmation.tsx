import {API_URL} from "@/config/index";
import cookie from "cookie";

export default function LoginConfirmationPage() {
    return <></>;
}

export async function getServerSideProps({req, res}) {
    const loginPath = req.url.substring(req.url.lastIndexOf("?"));
    const result = await fetch(`${API_URL}/auth/google/callback/${loginPath}`);
    const data = await result.json();
    if (result.ok) {
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60 * 24 * 7, // for a week
                sameSite: "strict",
                path: "/"
            })
        );
    }

    return {
        redirect: {
            permanent: false,
            destination: "/",
        },
    }
}
