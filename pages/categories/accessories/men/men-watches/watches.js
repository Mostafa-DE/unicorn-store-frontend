import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function AccessoriesWatches({ menWatches }) {
  const pathname = "/categories/accessories/men/men-watches";
  return (
    <Layout>
      <div className="containerCardProducts">
        {menWatches.map((menWatch) => (
          <ProductItems
            key={menWatch.id}
            product={menWatch}
            pathname={pathname}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/men-watches`);

  const menWatches = await res.json();

  return {
    props: {
      menWatches: menWatches,
    },
  };
}
