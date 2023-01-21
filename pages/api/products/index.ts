import {API_URL} from "@/config/index";
import {NextApiRequest, NextApiResponse} from "next";

const userApi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {url} = req.body;
        const productsRes = await fetch(`${API_URL}/${url}/`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        const data = await productsRes.json();

        res.status(productsRes.status).json(data);

    } catch (error) {
        res.status(500).json({});
    }

};

export default userApi;
