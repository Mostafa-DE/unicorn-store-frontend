import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function otherProducts({ kidsProducts }) {
  return (
    <Layout>
      <div className="containerCardProducts">
        {kidsProducts.map((kidsProduct) => (
          <ProductItems key={kidsProduct.id} product={kidsProduct} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/kids-products`);

  const kidsProducts = await res.json();

  return {
    props: {
      kidsProducts: kidsProducts,
    },
  };
}
