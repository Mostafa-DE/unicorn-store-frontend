import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function dresses({ localDresses }) {
  return (
    <Layout>
      <div className="containerCardProducts">
        {localDresses.map((localDresse) => (
          <ProductItems key={localDresse.id} product={localDresse} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/local-dresses`);

  const localDresses = await res.json();

  return {
    props: {
      localDresses: localDresses,
    },
  };
}
