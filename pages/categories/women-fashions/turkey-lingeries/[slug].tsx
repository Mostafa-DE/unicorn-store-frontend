import Layout from "@/components/Layout/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import qs from "qs";
import dynamic from "next/dynamic";


const DynamicProductDetails = dynamic(
    () => import("@/components/ProductDetails"),
    {
      loading: () => (
          <h1>Loading...</h1>
      )
    });

export default function ProductDetailsPage({ product, token, reviews }) {
  return (
    <Layout title="Product Details">
      {product.map((product) => (
        <DynamicProductDetails
          key={product.id}
          product={product}
          token={token}
          reviews={reviews}
        />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ req, query: { slug } }) {
  const { token = null } = parseCookies(req);

  const res = await fetch(`${API_URL}/turkey-lingeries?slug=${slug}`);
  const product = await res.json();

  const query = qs.stringify({
    _where: [
      { product: `/categories/women-fashions/turkey-lingeries/${slug}` },
    ],
  });

  const resReviews = await fetch(`${API_URL}/reviews?${query}`);
  const reviews = await resReviews.json();

  return {
    props: {
      product,
      token,
      reviews,
    },
  };
}
