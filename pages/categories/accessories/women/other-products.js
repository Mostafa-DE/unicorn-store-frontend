import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function otherProducts({ womenAccessories }) {
  return (
    <Layout>
      <div className="containerCardProducts">
        {womenAccessories.map((womenAccessory) => (
          <ProductItems key={womenAccessory.id} product={womenAccessory} />
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
