import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function bracelets({ bracelets }) {
  const pathname = "/categories/accessories/women/women-bracelets";
  return (
    <Layout>
      <div className="containerCardProducts">
        {bracelets.map((bracelet) => (
          <ProductItems
            key={bracelet.id}
            product={bracelet}
            pathname={pathname}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/bracelets`);

  const bracelets = await res.json();

  return {
    props: {
      bracelets: bracelets,
    },
  };
}
