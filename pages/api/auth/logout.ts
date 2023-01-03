import cookie from "cookie";
import {API_URL} from "@/config/index";
import {NextApiRequest, NextApiResponse} from "next";

const logoutUserApi = async (req: NextApiRequest, res: NextApiResponse) => {
    const {username} = req.body;
    const logoutRes = await fetch(`${API_URL}/api/auth/logout/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username})
    })

    const data = await logoutRes.json();

    if (logoutRes.ok) {
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", "", {
                httpOnly: true,
                expires: new Date(0),
                sameSite: "strict",
                path: "/",
            })
        );
    }
    res.status(logoutRes.status).json({message: "Successfully logged out, We hope to see you again soon!"});
};

export default logoutUserApi;
