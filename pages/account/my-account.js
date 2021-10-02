import Layout from "@/components/Layout";
import MyAccount from "@/components/MyAccount";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";

export default function myAccount({ accountUser }) {
  return (
    <Layout>
      <MyAccount accountUser={accountUser} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const accountUser = await res.json();

  return {
    props: {
      accountUser,
    },
  };
}
