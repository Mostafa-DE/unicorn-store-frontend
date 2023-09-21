import Layout from "@/components/Layout/Layout";
import {parseCookies} from "@/helpers/index";
import {API_URL} from "@/config/index";
import dynamic from "next/dynamic";

const DynamicMyAccount = dynamic(
    () => import("@/components/MyAccount"),
    {
        loading: () => (
            <h1>Loading...</h1>
        )
    });

export default function myAccount({userAccount, userProfile ,token}) {
    return (
        <Layout title="Your_Account_Details">
            <DynamicMyAccount
                userAccount={userAccount}
                token={token}
                userProfile={userProfile[0] || []}
            />
        </Layout>
    );
}

export async function getServerSideProps({req}) {
    const {user, token} = parseCookies(req);
    const userAccount = JSON.parse(user)
    const res = await fetch(`${API_URL}/profiles/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const userProfile = await res.json();

    return {
        props: {
            userAccount,
            userProfile: userProfile,
            token
        }
    };
}
