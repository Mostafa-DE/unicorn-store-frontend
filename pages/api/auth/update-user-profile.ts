import {NextApiRequest, NextApiResponse} from "next";
import {API_URL} from "@/config/index";

const updateProfile = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {address, city, building_number, phone} = req.body;
        const userRes = await fetch(`${API_URL}/api/auth/user-profile/`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': 'true',
                Cookie: req.headers.cookie,
            },
            body: JSON.stringify({
                address,
                city,
                building_number,
                phone
            })
        });
        const data = await userRes.json();

        res.status(userRes.status).json(data);
    } catch (error) {
        res.status(500).json({});
    }
}

export default updateProfile;
