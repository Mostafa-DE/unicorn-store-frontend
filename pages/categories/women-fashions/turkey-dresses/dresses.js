import { API_URL } from "@/config/index";
import Layout from "@/components/Layout/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";

export default function Dresses({ turkeyDresses, token }) {
  const pathname = "/categories/women-fashions/turkey-dresses";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout title="Women_Turkey_Dresses">
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">فساتين السهرة التركية</h1>
        <AiOutlineLine className="lineIcon" />
      </div>

      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={turkeyDresses}
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
  const res = await fetch(`${API_URL}/turkey-dresses`);

  const turkeyDresses = await res.json();

  return {
    props: {
      turkeyDresses: turkeyDresses,
      token: token
    }
  };
}
