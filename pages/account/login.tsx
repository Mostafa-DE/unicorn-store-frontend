import Layout from "@/components/Layout/Layout";
import {parseCookies} from "@/helpers/index";
import dynamic from "next/dynamic";

const DynamicLoginForm = dynamic(
    () => import("@/components/LoginForm"),
    {
        loading: () => (
            <h1>Loading...</h1>
        )
    });

function loginPage({userEmail}) {
    return (
        <Layout title="Account_Login">
            <DynamicLoginForm rememberEmailUser={userEmail?.email} />
        </Layout>
    );
}

export default loginPage;

export async function getServerSideProps({req}) {
    const {user = null} = parseCookies(req);
    const userEmail = JSON.parse(user)
    return {
        props: {
            userEmail
        }
    }
}
