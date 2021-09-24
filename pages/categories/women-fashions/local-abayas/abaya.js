import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function abaya({ localAbayas }) {
  const pathname = "/categories/women-fashions/local-abayas";
  return (
    <Layout>
      <div className="containerCardProducts">
        {localAbayas.map((localAbaya) => (
          <ProductItems
            key={localAbaya.id}
            product={localAbaya}
            pathname={pathname}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/local-abayas`);

  const localAbayas = await res.json();

  return {
    props: {
      localAbayas: localAbayas,
    },
  };
}
