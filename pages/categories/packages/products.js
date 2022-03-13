import { API_URL } from "@/config/index";
import Layout from "@/components/Layout/Layout";
import SearchInput from "@/components/SearchInput/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch/ProductsWithSearch";
import { parseCookies } from "@/helpers/index";
import { AiOutlineLine } from "react-icons/ai";
import useSearch from "@/Hooks/useSearch";

export default function Packages({ packages, token }) {
  const pathname = "/categories/packages";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout title="Packages & Gifts & More">
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title"> قسم الهدايا والباكيجات</h1>
        <AiOutlineLine className="lineIcon" />
      </div>

      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={packages}
          pathname={pathname}
          searchTerm={searchTerm}
          token={token}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token = null } = parseCookies(req);
  const res = await fetch(`${API_URL}/packages`);

  const packages = await res.json();

  return {
    props: {
      packages: packages,
      token: token
    }
  };
}
