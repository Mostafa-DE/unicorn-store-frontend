import { API_URL } from "@/config/index";
import Layout from "@/components/Layout/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";

export default function Necklace({ necklaces, token }) {
  const pathname = "/categories/accessories/women/women-necklace";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout title="Necklaces">
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">القلادات النسائية</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={necklaces}
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
  const res = await fetch(`${API_URL}/necklaces`);

  const necklaces = await res.json();

  return {
    props: {
      necklaces: necklaces,
      token: token
    }
  };
}
