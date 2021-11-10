import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";

export default function Abaya({ localAbayas, token }) {
  const pathname = "/categories/women-fashions/local-abayas";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout>
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">العبايات و القطافين المحلية</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={localAbayas}
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
  const res = await fetch(`${API_URL}/local-abayas`);

  const localAbayas = await res.json();

  return {
    props: {
      localAbayas: localAbayas,
      token: token
    }
  };
}
