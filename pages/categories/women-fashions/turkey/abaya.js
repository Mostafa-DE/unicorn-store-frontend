import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function abaya({ turkeyAbayas }) {
  return (
    <Layout>
      <div className="containerCardProducts">
        {turkeyAbayas.map((turkeyAbaya) => (
          <ProductItems key={turkeyAbaya.id} product={turkeyAbaya} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/turkey-abayas`);

  const turkeyAbayas = await res.json();

  return {
    props: {
      turkeyAbayas: turkeyAbayas,
    },
  };
}
