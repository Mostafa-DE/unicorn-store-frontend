import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function otherProducts({ womenAccessories }) {
  const pathname = "/categories/accessories/women/all-products";
  return (
    <Layout>
      <div className="containerCardProducts">
        {womenAccessories.map((womenAccessory) => (
          <ProductItems
            key={womenAccessory.id}
            product={womenAccessory}
            pathname={pathname}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/women-accessories`);

  const womenAccessories = await res.json();

  return {
    props: {
      womenAccessories: womenAccessories,
    },
  };
}
