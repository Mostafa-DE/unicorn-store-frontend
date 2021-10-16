import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";

export default function lingeries({ localLingeries, token }) {
  const pathname = "/categories/women-fashions/local-lingeries";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout>
      <div className="containerTitle">
        <h1 className="h1Title">قسم اللانجري المحلي</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={localLingeries}
          pathname={pathname}
          searchTerm={searchTerm}
          token={token}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/local-lingeries`);

  const localLingeries = await res.json();

  return {
    props: {
      localLingeries: localLingeries,
      token: token,
    },
  };
}
