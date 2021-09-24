import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function dresses({ localDresses }) {
  const pathname = "/categories/women-fashions/local-dresses";
  return (
    <Layout>
      <div className="containerCardProducts">
        {localDresses.map((localDresse) => (
          <ProductItems
            key={localDresse.id}
            product={localDresse}
            pathname={pathname}
          />
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
