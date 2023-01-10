import { API_URL } from "@/config/index";
import Layout from "@/components/Layout/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch/ProductsWithSearch";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/parseCookies";
import {
  getStartAndEndValueForPagination,
  values,
} from "@/helpers/paginationLogic";
import Pagination from "@/components/Pagination";
import usePagination from "@/Hooks/usePagination";

export default function KidsDresses({ kidsDresses, token, totalPages }) {
  const pathname = "/categories/kids-fashions/kids-dresses";
  const [searchTerm, handleChange] = useSearch();
  const [page, handleChangePage] = usePagination();

  return (
    <Layout title="Kids_Dresses">
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
      {kidsDresses.length !== 0 && (
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
  const res = await fetch(`${API_URL}/kids-dresses`);

  const kidsDresses = await res.json();
  getStartAndEndValueForPagination(kidsDresses, page);

  return {
    props: {
      kidsDresses: kidsDresses.slice(values.start, values.end),
      token: token,
      totalPages: values.totalPages,
    },
  };
}
