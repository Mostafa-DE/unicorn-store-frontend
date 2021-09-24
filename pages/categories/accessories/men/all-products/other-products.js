import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function otherProducts({ menProducts }) {
  const pathname = "/categories/accessories/men/all-products";
  return (
    <Layout>
      <div className="containerCardProducts">
        {menProducts.map((menProduct) => (
          <ProductItems
            key={menProduct.id}
            product={menProduct}
            pathname={pathname}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/men-accessories`);

  const menProducts = await res.json();

  return {
    props: {
      menProducts: menProducts,
    },
  };
}
