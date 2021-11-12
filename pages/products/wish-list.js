import Layout from "@/components/Layout";
import WishList from "@/components/WishList";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";

export default function wishListPage({ userWishProduct, token }) {
  return (
    <Layout title="Your_Wish_List">
      <WishList token={token} products={userWishProduct} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/wishes/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const userWishProduct = await res.json();

  return {
    props: {
      userWishProduct: userWishProduct,
      token: token
    }
  };
}
