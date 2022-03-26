import Layout from "@/components/Layout/Layout";
import MyAccount from "@/components/MyAccount/MyAccount";
import {parseCookies} from "@/helpers/index";

export default function myAccount({userAccount}) {
    return (
        <Layout title="Your_Account_Details">
            <MyAccount userAccount={userAccount}/>
        </Layout>
    );
}

export async function getServerSideProps({req}) {
    const {user} = parseCookies(req);
    const userAccount = JSON.parse(user)
    return {
        props: {
            userAccount,
        }
    };
}
