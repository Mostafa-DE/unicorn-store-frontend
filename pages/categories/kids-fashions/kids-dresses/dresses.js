import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function KidsDresses({ kidsDresses }) {
  const pathname = "/categories/kids-fashions/kids-dresses";
  return (
    <Layout>
      <div className="containerCardProducts">
        {kidsDresses.map((kidsDress) => (
          <ProductItems
            key={kidsDress.id}
            product={kidsDress}
            pathname={pathname}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/kids-dresses`);

  const kidsDresses = await res.json();

  return {
    props: {
      kidsDresses: kidsDresses,
    },
  };
}
