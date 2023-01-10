import Layout from "@/components/Layout/Layout";
import { API_URL } from "@/config/index";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { parseCookies } from "@/helpers/parseCookies";
import qs from "qs";

export default function ProductDetailsPage({ product, token, reviews }) {
  return (
    <Layout title="Product Details">
      {product.map((product) => (
        <ProductDetails
          token={token}
          key={product.id}
          product={product}
          reviews={reviews}
        />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ req, query: { slug } }) {
  const { token = null } = parseCookies(req);

  const res = await fetch(`${API_URL}/men-products?slug=${slug}`);
  const product = await res.json();

  const query = qs.stringify({
    _where: [{ product: `/categories/men-fashions/all-products/${slug}` }],
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
