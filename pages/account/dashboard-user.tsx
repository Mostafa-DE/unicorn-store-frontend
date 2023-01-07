import Layout from "@/components/Layout/Layout";
import DashboardUser from "@/components/DashboardUser/DashboardUser";
import {parseCookies} from "@/helpers/parseCookies";
import {API_URL} from "@/config/index";

export default function dashboardUserPage({userOrders}) {
    return (
        <Layout title="Account_Register">
            <DashboardUser userOrders={userOrders}/>
        </Layout>
    );
}

export async function getServerSideProps({req}) {
    const {token = null} = parseCookies(req);
    const getOrdersUser = await fetch(`${API_URL}/orders/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const userOrders = await getOrdersUser.json();
    return {
        props: {
            userOrders,
        }
    };
}
