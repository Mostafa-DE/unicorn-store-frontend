import Layout from "@/components/Layout/Layout";
import MyAccount from "@/components/MyAccount/MyAccount";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";

export default function myAccount({ userAccount, token }) {
  return (
    <Layout title="Your_Account_Details">
      <MyAccount token={token} userAccount={userAccount} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token = null } = parseCookies(req);

  const res = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const userAccount = await res.json();

  return {
    props: {
      userAccount,
      token: token
    }
  };
}
