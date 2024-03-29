import cookie from "cookie";
import {API_URL} from "@/config/index";

const loginApi = async (req: any, res: any) => {
    if (req.method === "POST") {
        const {identifier, password} = req.body;
        const strapiRes = await fetch(`${API_URL}/auth/local`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identifier,
                password
            })
        });
        const data = await strapiRes.json();
        if (strapiRes.ok) {
            /* @todo - set a Cookie */
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
            /*----------X-----------*/
            res.status(200).json({user: data.user});
        } else {
            res.status(data.statusCode).json({
                message:
                    "البريد الإلكتروني أو كلمة المرور غير صحيحة, يرجى المحاولة مرة أخرى"
            });
        }
        // res.status(200).json({});
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({message: `Method ${req.method} not allowed`});
    }
};
export default loginApi;
