import Layout from "@/components/Layout/Layout";
import { parseCookies } from "@/helpers/index";
import dynamic from "next/dynamic";

const DynamicShoppingBag = dynamic(
    () => import("@/components/ShoppingBag"),
    {
        loading: () => (
        <h1>Loading...</h1>
        )
    });

export default function shoppingBagListPage({ userAccount, token }) {
  return (
    <Layout title="Your_Shopping_Bag">
      {/* 
      //TODO: add right types here 
      // @ts-ignore */}
      <DynamicShoppingBag user={userAccount} token={token} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token = null } = parseCookies(req);

  return {
    props: {
      token: token,
    },
  };
}
