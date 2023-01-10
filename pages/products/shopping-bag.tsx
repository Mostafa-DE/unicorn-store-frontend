import ShoppingBag from "@/components/ShoppingBag/ShoppingBag";
import {API_URL} from "@/config/index";

export default function shoppingBagListPage({bag}) {
    return <ShoppingBag bag={bag}/>;
}

export async function getServerSideProps({req}) {
    const bagRes = await fetch(`${API_URL}/api/cart/`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': 'true',
            Cookie: req.headers.cookie,
        }
    });

    const bag = await bagRes.json();

    return {
        props: {
            bag: bag,
        },
    };
}
