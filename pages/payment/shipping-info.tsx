import Layout from "@/components/Layout/Layout";
import ShippingInfoForm from "@/components/ShippingInfoForm/ShippingInfoForm";
import {API_URL} from "@/config/index";
import {parseCookies} from "@/helpers/parseCookies";

export default function shippingInformation({user, userProfile, token}) {
    return (
        <Layout title="Shipping_Information">
            <ShippingInfoForm
                token={token}
                userProfile={userProfile}
                user={user}
            />
        </Layout>
    );
}

export async function getServerSideProps({req}) {
    const {token = null} = parseCookies(req);

    const userRes = await fetch(`${API_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const user = await userRes.json();

    const profileRes = await fetch(`${API_URL}/profiles/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const userProfile = await profileRes.json();

    return {
        props: {
            user,
            userProfile,
            token: token
        }
    };
}
