import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function otherProducts({ localWomenProducts }) {
  return (
    <Layout>
      <div className="containerCardProducts">
        {localWomenProducts.map((localWomenProduct) => (
          <ProductItems
            key={localWomenProduct.id}
            product={localWomenProduct}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/local-women-products`);

  const localWomenProducts = await res.json();

  return {
    props: {
      localWomenProducts: localWomenProducts,
    },
  };
}
