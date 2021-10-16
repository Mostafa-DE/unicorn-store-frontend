import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import ProductItems from "@/components/ProductItems";
import { parseCookies } from "@/helpers/index";

export default function Packages({ packages, token }) {
  const pathname = "/categories/packages";
  return (
    <Layout>
      <div className="containerCardProducts">
        {packages.map((package) => (
          <ProductItems
            key={package.id}
            product={package}
            pathname={pathname}
            token={token}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/packages`);

  const packages = await res.json();

  return {
    props: {
      packages: packages,
      token: token,
    },
  };
}
