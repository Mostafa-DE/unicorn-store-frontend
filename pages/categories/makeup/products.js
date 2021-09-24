import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function makeup({ makeups }) {
  const pathname = "/categories//makeup";
  return (
    <Layout>
      <div className="containerCardProducts">
        {makeups.map((makeup) => (
          <ProductItems key={makeup.id} product={makeup} pathname={pathname} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/make-ups`);

  const makeups = await res.json();

  return {
    props: {
      makeups: makeups,
    },
  };
}
