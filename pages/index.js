import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import CategoriesPhoto from "@/components/CategoriesPhoto";
import { API_URL } from "@/config/index";
import ProductItems from "@/components/ProductItems";
import { parseCookies } from "@/helpers/index";

export default function Home({ turkeyDresses, localAbayas, token }) {
  return (
    <Layout title="Unicorn Store | Shop Online For Fastions, Tools, Gifts & More">
      <CategoriesPhoto />

      <div className="containerCardProducts">
        {turkeyDresses.map((product) => (
          <ProductItems
            pathname={product.productDetailsPage}
            token={token}
            key={product.id}
            product={product}
          />
        ))}

        {localAbayas.map((product) => (
          <ProductItems
            pathname={product.productDetailsPage}
            token={token}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const turkeyDressesRes = await fetch(`${API_URL}/turkey-dresses?_limit=2`);
  const turkeyDresses = await turkeyDressesRes.json();

  const localAbayasRes = await fetch(`${API_URL}/local-abayas?_limit=2`);
  const localAbayas = await localAbayasRes.json();

  return {
    props: {
      turkeyDresses: turkeyDresses,
      localAbayas: localAbayas,
      token: token,
    },
  };
}
