import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";

export default function Pajamas({ kidsPajamas, token }) {
  const pathname = "/categories/kids-fashions/kids-pajamas";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout title="Kids_Pajamas">
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">بيجامات الأطفال</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={kidsPajamas}
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
  const res = await fetch(`${API_URL}/kids-pajamas`);

  const kidsPajamas = await res.json();

  return {
    props: {
      kidsPajamas: kidsPajamas,
      token: token
    }
  };
}
