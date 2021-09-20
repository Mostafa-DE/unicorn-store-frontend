import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function lingeries({ localLingeries }) {
  return (
    <Layout>
      <div className="containerCardProducts">
        {localLingeries.map((localLingerie) => (
          <ProductItems key={localLingerie.id} product={localLingerie} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/local-lingeries`);

  const localLingeries = await res.json();

  return {
    props: {
      localLingeries: localLingeries,
    },
  };
}
