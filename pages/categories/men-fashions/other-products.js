import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function otherProducts({ menProducts }) {
  return (
    <Layout>
      <div className="containerCardProducts">
        {menProducts.map((menProduct) => (
          <ProductItems key={menProduct.id} product={menProduct} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/men-products`);

  const menProducts = await res.json();

  return {
    props: {
      menProducts: menProducts,
    },
  };
}
