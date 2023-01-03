import {API_URL} from "@/config/index";
import {NextApiRequest, NextApiResponse} from "next";

const userProfileApi = async (req: NextApiRequest, res: NextApiResponse) => {
    const userRes = await fetch(`${API_URL}/api/auth/user-profile/`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': 'true',
            Cookie: req.headers.cookie,
        }
    });
    const data = await userRes.json();

    res.status(userRes.status).json(data);
};

export default userProfileApi;
