import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function AccessoriesKids({ kidsAccessories }) {
  return (
    <Layout>
      <div className="containerCardProducts">
        {kidsAccessories.map((kids) => (
          <ProductItems key={kids.id} product={kids} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/kids-accessories`);

  const kidsAccessories = await res.json();

  return {
    props: {
      kidsAccessories: kidsAccessories,
    },
  };
}
