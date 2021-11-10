import Layout from "@/components/Layout";
import ShippingInfoForm from "@/components/ShippingInfoForm";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";

export default function shippingInformations({
  currentUser,
  token,
  discounts,
}) {
  return (
    <Layout>
      <ShippingInfoForm
        discounts={discounts}
        token={token}
        currentUser={currentUser}
      />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token = null } = parseCookies(req);
  const res = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const currentUser = await res.json();

  const resDiscount = await fetch(`${API_URL}/discounts`);
  const discountData = await resDiscount.json();

  return {
    props: {
      currentUser,
      token: token,
      discounts: discountData,
    },
  };
}