import ShoppingBag from "@/components/ShoppingBag/ShoppingBag";
import {parseCookies} from "@/helpers/parseCookies";

export default function shoppingBagListPage({token}) {
    return <ShoppingBag token={token}/>;
}

export async function getServerSideProps({req}) {
    const {token = null} = parseCookies(req);

    return {
        props: {
            token: token,
        },
    };
}
