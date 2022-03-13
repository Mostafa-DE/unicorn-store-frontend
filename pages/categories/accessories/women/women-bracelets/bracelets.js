import { API_URL } from "@/config/index";
import Layout from "@/components/Layout/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";

export default function Bracelets({ bracelets, token }) {
  const pathname = "/categories/accessories/women/women-bracelets";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout title="Bracelets">
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">الأسوار النسائية</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={bracelets}
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
  const res = await fetch(`${API_URL}/bracelets`);

  const bracelets = await res.json();

  return {
    props: {
      bracelets: bracelets,
      token: token
    }
  };
}
