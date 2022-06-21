import Layout from "@/components/Layout/Layout";
import LoginForm from "@/components/LoginForm/LoginForm";
import {parseCookies} from "@/helpers/index";

function loginPage({userEmail}) {
    return (
        <Layout title="Account_Login">
            <LoginForm rememberEmailUser={userEmail?.email} />
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
