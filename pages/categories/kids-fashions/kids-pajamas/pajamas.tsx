import { API_URL } from "@/config/index";
import Layout from "@/components/Layout/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";
import {
  getStartAndEndValueForPagination,
  values,
} from "@/helpers/paginationLogic";
import Pagination from "@/components/Pagination";
import usePagination from "@/Hooks/usePagination";

export default function Pajamas({ kidsPajamas, token, totalPages }) {
  const pathname = "/categories/kids-fashions/kids-pajamas";
  const [searchTerm, handleChange] = useSearch();
  const [page, handleChangePage] = usePagination();

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
      {kidsPajamas.length !== 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, query: { page = 1 } }) {
  const { token = null } = parseCookies(req);
  const res = await fetch(`${API_URL}/kids-pajamas`);

  const kidsPajamas = await res.json();
  getStartAndEndValueForPagination(kidsPajamas, page);

  return {
    props: {
      kidsPajamas: kidsPajamas.slice(values.start, values.end),
      token: token,
      totalPages: values.totalPages,
    },
  };
}
