import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";

export default function KidsDresses({ kidsDresses, token }) {
  const pathname = "/categories/kids-fashions/kids-dresses";
  const [searchTerm, handleChange] = useSearch("");

  return (
    <Layout>
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">فساتين الأطفال</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={kidsDresses}
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
  const res = await fetch(`${API_URL}/kids-dresses`);

  const kidsDresses = await res.json();

  return {
    props: {
      kidsDresses: kidsDresses,
      token: token,
    },
  };
}