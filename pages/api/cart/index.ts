import {API_URL} from "@/config/index";
import {NextApiRequest, NextApiResponse} from "next";

const cartApi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const cartRes = await fetch(`${API_URL}/api/cart/`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': 'true',
                Cookie: req.headers.cookie,
            }

        });
        const data = await cartRes.json();

        res.status(cartRes.status).json(data);

    } catch (error) {
        res.status(500).json([]);
    }

};

export default cartApi;
