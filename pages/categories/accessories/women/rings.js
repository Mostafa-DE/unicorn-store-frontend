import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function rings({ rings }) {
  return (
    <Layout>
      <div className="containerCardProducts">
        {rings.map((ring) => (
          <ProductItems key={ring.id} product={ring} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/rings`);

  const rings = await res.json();

  return {
    props: {
      rings: rings,
    },
  };
}
