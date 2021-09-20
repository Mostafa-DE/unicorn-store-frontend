import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function lingeries({ turkeyLingeries }) {
  return (
    <Layout>
      <div className="containerCardProducts">
        {turkeyLingeries.map((turkeyLingerie) => (
          <ProductItems key={turkeyLingerie.id} product={turkeyLingerie} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/turkey-lingeries`);

  const turkeyLingeries = await res.json();

  return {
    props: {
      turkeyLingeries: turkeyLingeries,
    },
  };
}
