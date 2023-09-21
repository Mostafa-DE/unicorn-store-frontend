import { API_URL } from "@/config/index";
import Layout from "@/components/Layout/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput/SearchInput";
import { AiOutlineLine } from "react-icons/ai";
import { parseCookies } from "@/helpers/index";
import {
  getStartAndEndValueForPagination,
  values,
} from "@/helpers/paginationLogic";
import usePagination from "@/Hooks/usePagination";
import dynamic from "next/dynamic";


const DynamicProductsWithSearch = dynamic(
    () => import("@/components/ProductsWithSearch"),
    {
      loading: () => (
          <div>Loading...</div>
      )
    });

const DynamicPagination = dynamic(
    () => import("@/components/Pagination"),
    {
      loading: () => (
          <div>Loading...</div>
      )
    });

export default function Makeup({ makeups, token, totalPages }) {
  const pathname = "/categories//makeup";
  const [searchTerm, handleChange] = useSearch();
  const [page, handleChangePage] = usePagination();

  return (
    <Layout title="Makeup">
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">قسم التجميل</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <DynamicProductsWithSearch
          productsData={makeups}
          pathname={pathname}
          searchTerm={searchTerm}
          token={token}
        />
      </div>
      {makeups.length !== 0 && (
        <DynamicPagination
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
  const res = await fetch(`${API_URL}/make-ups`);

  const makeups = await res.json();
  getStartAndEndValueForPagination(makeups, page);

  return {
    props: {
      makeups: makeups.slice(values.start, values.end),
      token: token,
      totalPages: values.totalPages,
    },
  };
}
