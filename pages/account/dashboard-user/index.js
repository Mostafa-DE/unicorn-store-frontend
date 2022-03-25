import Layout from "@/components/Layout/Layout";
import DashboardUser from "@/components/DashboardUser/DashboardUser";
import {parseCookies} from "@/helpers/index";

export default function dashboardUserPage({userOrders}) {
    return (
        <Layout title="Account_Register">
            <DashboardUser userOrders={userOrders}/>
        </Layout>
    );
}

export async function getServerSideProps({req}) {
    const {AllUserOrder} = parseCookies(req);
    const userOrders = await JSON.parse(AllUserOrder)
    return {
        props: {
            userOrders,
        }
    };
}
