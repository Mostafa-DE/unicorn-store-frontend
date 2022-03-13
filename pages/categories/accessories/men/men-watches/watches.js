import { API_URL } from "@/config/index";
import Layout from "@/components/Layout/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";

export default function AccessoriesWatches({ menWatches, token }) {
  const pathname = "/categories/accessories/men/men-watches";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout title="Men_Watches">
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">الساعات الرجالي</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={menWatches}
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
  const res = await fetch(`${API_URL}/men-watches`);

  const menWatches = await res.json();

  return {
    props: {
      menWatches: menWatches,
      token: token
    }
  };
}
