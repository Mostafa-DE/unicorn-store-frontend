import Layout from "@/components/Layout";
import InvoiceOrder from "@/components/InvoiceOrder";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";

export default function invoiceOrderPage({ currentUser, token }) {
  return (
    <Layout>
      <InvoiceOrder token={token} user={currentUser} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token = null } = parseCookies(req);
  const res = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const currentUser = await res.json();

  return {
    props: {
      currentUser,
      token: token
    }
  };
}
