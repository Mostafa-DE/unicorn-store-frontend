import {API_URL} from "@/config/index";
import {NextApiRequest, NextApiResponse} from "next";

const userApi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const userRes = await fetch(`${API_URL}/api/auth/user/`, {
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

    } catch (error) {
        res.status(500).json({});
    }

};

export default userApi;
