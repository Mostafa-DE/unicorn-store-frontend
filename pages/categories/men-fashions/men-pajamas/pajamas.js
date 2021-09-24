import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function MenPajamas({ menPagamas }) {
  const pathname = "/categories/men-fashions/men-pajamas";
  return (
    <Layout>
      <div className="containerCardProducts">
        {menPagamas.map((menPagama) => (
          <ProductItems
            key={menPagama.id}
            product={menPagama}
            pathname={pathname}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/men-pajamas`);

  const menPagamas = await res.json();

  return {
    props: {
      menPagamas: menPagamas,
    },
  };
}
