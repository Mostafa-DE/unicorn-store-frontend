import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function necklace({ necklaces }) {
  const pathname = "/categories/accessories/women/women-necklace";
  return (
    <Layout>
      <div className="containerCardProducts">
        {necklaces.map((necklace) => (
          <ProductItems
            key={necklace.id}
            product={necklace}
            pathname={pathname}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/necklaces`);

  const necklaces = await res.json();

  return {
    props: {
      necklaces: necklaces,
    },
  };
}
