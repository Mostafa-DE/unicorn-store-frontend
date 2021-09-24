import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";

export default function Packages({ packages }) {
  const pathname = "/categories/packages";
  return (
    <Layout>
      <div className="containerCardProducts">
        {packages.map((package) => (
          <ProductItems
            key={package.id}
            product={package}
            pathname={pathname}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/packages`);

  const packages = await res.json();

  return {
    props: {
      packages: packages,
    },
  };
}
