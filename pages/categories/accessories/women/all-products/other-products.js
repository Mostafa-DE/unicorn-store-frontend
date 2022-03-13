import { API_URL } from "@/config/index";
import Layout from "@/components/Layout/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";

export default function OtherProducts({ womenAccessories, token }) {
  const pathname = "/categories/accessories/women/all-products";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout title="Women_Accessories">
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">جميع إكسسوارات النساء</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={womenAccessories}
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
  const res = await fetch(`${API_URL}/women-accessories`);

  const womenAccessories = await res.json();

  return {
    props: {
      womenAccessories: womenAccessories,
      token: token
    }
  };
}
