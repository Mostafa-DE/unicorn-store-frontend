import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";

export default function OtherProducts({ localWomenProducts, token }) {
  const pathname = "/categories/women-fashions/local-all-products";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout title="Women_Local_Fashions">
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">جميع المنتجات المحلية</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={localWomenProducts}
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
  const res = await fetch(`${API_URL}/local-women-products`);

  const localWomenProducts = await res.json();

  return {
    props: {
      localWomenProducts: localWomenProducts,
      token: token
    }
  };
}
