import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";

export default function MenPajamas({ menPagamas, token }) {
  const pathname = "/categories/men-fashions/men-pajamas";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout title="Men_Pagamas">
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">البيجامات الرجالي</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={menPagamas}
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
  const res = await fetch(`${API_URL}/men-pajamas`);

  const menPagamas = await res.json();

  return {
    props: {
      menPagamas: menPagamas,
      token: token
    }
  };
}
