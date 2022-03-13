import Layout from "@/components/Layout/Layout";
import { API_URL } from "@/config/index";
import ProductDetails from "@/components/ProductDetails/ProductDetails";

export default function ProductDetailsPage({ product }) {
  return (
    <Layout>
      {product.map((product) => (
        <ProductDetails key={product.id} product={product} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/local-abayas?slug=${slug}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}
