import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function Houseware({ housewares }) {
  const pathname = "/categories/houseware";
  return (
    <Layout>
      <div className="containerCardProducts">
        {housewares.map((houseware) => (
          <ProductItems
            key={houseware.id}
            product={houseware}
            pathname={pathname}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/house-wares`);

  const housewares = await res.json();

  return {
    props: {
      housewares: housewares,
    },
  };
}
