import {API_URL} from "@/config/index";
import {NextApiRequest, NextApiResponse} from "next";

interface RegisterRequest extends NextApiRequest {
    body: {
        username: string;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
    }
}


const registerApi = async (req: RegisterRequest, res: NextApiResponse) => {
    try {
        const {username, email, first_name, last_name, password} = req.body;
        const registerRes = await fetch(`${API_URL}/api/auth/register/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': 'true',
                Cookie: req.headers.cookie,
            },
            body: JSON.stringify({
                username,
                email,
                first_name,
                last_name,
                password,
            })
        });

        const data = await registerRes.json();
        res.status(registerRes.status).json(data);
    } catch (error) {
        res.status(500).json({});
    }
};

export default registerApi;
