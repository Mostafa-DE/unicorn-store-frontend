import Layout from "@/components/Layout";
import ShippingInfoForm from "@/components/ShippingInfoForm";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";

export default function shippingInformations({ currentUser }) {
  // console.log(currentUser);
  return (
    <Layout>
      <ShippingInfoForm currentUser={currentUser} />
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

  const currentUser = await res.json();

  return {
    props: {
      currentUser,
    },
  };
}
