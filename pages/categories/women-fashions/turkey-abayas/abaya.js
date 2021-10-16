import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";

export default function abaya({ turkeyAbayas, token }) {
  const pathname = "/categories/women-fashions/turkey-abayas";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout>
      <div className="containerTitle">
        <h1 className="h1Title">العبايات و القطافين التركية</h1>
        <AiOutlineLine className="lineIcon" />
      </div>

      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={turkeyAbayas}
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
  const res = await fetch(`${API_URL}/turkey-abayas`);

  const turkeyAbayas = await res.json();

  return {
    props: {
      turkeyAbayas: turkeyAbayas,
      token: token,
    },
  };
}
