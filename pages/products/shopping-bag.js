import Layout from "@/components/Layout";
import ShoppingBag from "@/components/ShoppingBag";
import { parseCookies } from "@/helpers/index";

export default function shoppingBagListPage({ userAccount, token }) {
  return (
    <Layout title="Your_Shopping_Bag">
      <ShoppingBag user={userAccount} token={token} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token = null } = parseCookies(req);

  return {
    props: {
      token: token
    }
  };
}
