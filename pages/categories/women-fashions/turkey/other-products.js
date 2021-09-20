import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function otherProducts({ turkeyWomenProducts }) {
  return (
    <Layout>
      <div className="containerCardProducts">
        {turkeyWomenProducts.map((turkeyWomenProduct) => (
          <ProductItems
            key={turkeyWomenProduct.id}
            product={turkeyWomenProduct}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/turkey-women-products`);

  const turkeyWomenProducts = await res.json();

  return {
    props: {
      turkeyWomenProducts: turkeyWomenProducts,
    },
  };
}
