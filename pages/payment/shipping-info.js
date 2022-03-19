import Layout from "@/components/Layout/Layout";
import ShippingInfoForm from "@/components/ShippingInfoForm/ShippingInfoForm";
import {API_URL} from "@/config/index";
import {parseCookies} from "@/helpers/index";

export default function shippingInformation({currentUser, token}) {
    return (
        <Layout title="Shipping_Information">
            <ShippingInfoForm
                token={token}
                currentUser={currentUser}
            />
        </Layout>
    );
}

export async function getServerSideProps({req}) {
    const {token = null} = parseCookies(req);

    // Get current user
    const res = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const currentUser = await res.json();

    return {
        props: {
            currentUser,
            token: token,
        }
    };
}
