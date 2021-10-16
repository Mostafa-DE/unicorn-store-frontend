import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";

export default function AccessoriesKids({ kidsAccessories, token }) {
  const pathname = "/categories/accessories/kids/all-products";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout>
      <div className="containerTitle">
        <h1 className="h1Title">إكسسوارات الأطفال</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={kidsAccessories}
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

  const res = await fetch(`${API_URL}/kids-accessories`);

  const kidsAccessories = await res.json();

  return {
    props: {
      kidsAccessories: kidsAccessories,
      token: token,
    },
  };
}
