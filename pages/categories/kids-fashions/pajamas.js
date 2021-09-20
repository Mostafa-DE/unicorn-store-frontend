import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function pajamas({ kidsPajamas }) {
  return (
    <Layout>
      <div className="containerCardProducts">
        {kidsPajamas.map((kidsPajama) => (
          <ProductItems key={kidsPajama.id} product={kidsPajama} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/kids-pajamas`);

  const kidsPajamas = await res.json();

  return {
    props: {
      kidsPajamas: kidsPajamas,
    },
  };
}
