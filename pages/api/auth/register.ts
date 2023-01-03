// import cookie from "cookie";
import {API_URL} from "@/config/index";
import {NextApiRequest, NextApiResponse} from "next";

interface RegisterRequest extends NextApiRequest {
    body: {
        username: string;
        email: string;
        password: string;
    }
}


const registerApi = async (req: RegisterRequest, res: NextApiResponse) => {
    // if (req.method === "POST") {
    const {username, email, password} = req.body;
    const registerRes = await fetch(`${API_URL}/auth/local/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    const data = await registerRes.json();
    res.status(registerRes.status).json(data);
    // if (registerRes.ok) {
    //     //Set a Cookie for a week
    //     res.setHeader(
    //         "Set-Cookie",
    //         cookie.serialize("token", data.jwt, {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV !== "development",
    //             maxAge: 60 * 60 * 24 * 7,
    //             sameSite: "strict",
    //             path: "/"
    //         })
    //     );
    //
    //     res.status(200).json({user: data.user});
    // } else {
    //     res.status(data.statusCode).json({
    //         message:
    //             "إسم المستخدم غير صالح أو البريد الإلكتروني مستخدم من قبل, إذا كنت متأكد من أن البريد الإلكتروني غير مستخدم من قبل, يرجى المحاولة بإستخدام إسم مستخدم آخر "
    //     });
    // }
    // } else {
    //     res.setHeader("Allow", ["POST"]);
    //     res.status(405).json({message: `Method ${req.method} not allowed`});
    // }
};

export default registerApi;
