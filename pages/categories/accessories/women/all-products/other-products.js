import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";

export default function otherProducts({ womenAccessories }) {
  const pathname = "/categories/accessories/women/all-products";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout>
      <div className="containerTitle">
        <h1 className="h1Title">جميع إكسسوارات النساء</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={womenAccessories}
          pathname={pathname}
          searchTerm={searchTerm}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/women-accessories`);

  const womenAccessories = await res.json();

  return {
    props: {
      womenAccessories: womenAccessories,
    },
  };
}
