import {API_URL} from "@/config/index";
import {NextApiRequest, NextApiResponse} from "next";
import cookie from "cookie";

interface LoginRequest extends NextApiRequest {
    body: {
        username: string;
        password: string;
    }
}

const loginApi = async (req: LoginRequest, res: NextApiResponse) => {
    const {username, password} = req.body;
    const loginRes = await fetch(`${API_URL}/api/auth/login/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': 'true',
            Cookie: req.headers.cookie,
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const data = await loginRes.json();

    if (loginRes.ok) {
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", data.token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7, // for a week
                sameSite: "strict",
                path: "/"
            })
        );
    }
    res.status(loginRes.status).json({data});
};
export default loginApi;
