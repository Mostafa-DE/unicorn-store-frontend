import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function dresses({ turkeyDresses }) {
  return (
    <Layout>
      <div className="containerCardProducts">
        {turkeyDresses.map((turkeyDress) => (
          <ProductItems key={turkeyDress.id} product={turkeyDress} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/turkey-dresses`);

  const turkeyDresses = await res.json();

  return {
    props: {
      turkeyDresses: turkeyDresses,
    },
  };
}
