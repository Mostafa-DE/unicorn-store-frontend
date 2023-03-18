import {API_URL} from "@/config/index";
import {NextApiRequest, NextApiResponse} from "next";

const createCartItemApi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {productId, quantity, cartId, color, size} = req.body;
        const cartItemRes = await fetch(`${API_URL}/api/cart/item/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Credentials': 'true',
                Cookie: req.headers.cookie,
            },
            body: JSON.stringify({
                "productId": productId,
                "quantity": quantity,
                "cart": cartId,
                "color": color,
                "size": size
            })


        });
        const data = await cartItemRes.json();

        res.status(cartItemRes.status).json(data);

    } catch (error) {
        res.status(500).json([]);
    }

};

export default createCartItemApi;
