import Layout from "@/components/Layout/Layout";
import DashboardUser from "@/components/DashboardUser/DashboardUser";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";

export default function dashboardUserPage({ userOrders, token }) {
  return (
    <Layout title="Account_Register">
      <DashboardUser userOrders={userOrders} token={token} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token = null } = parseCookies(req);

  const res = await fetch(`${API_URL}/orders/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const userOrders = await res.json();

  return {
    props: {
      userOrders,
      token
    }
  };
}
