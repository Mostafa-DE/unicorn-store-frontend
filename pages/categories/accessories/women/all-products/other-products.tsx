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

export default function OtherProducts({ womenAccessories, token, totalPages }) {
  const pathname = "/categories/accessories/women/all-products";
  const [searchTerm, handleChange] = useSearch();
  const [page, handleChangePage] = usePagination();

  return (
    <Layout title="Women_Accessories">
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">جميع إكسسوارات النساء</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={womenAccessories}
          pathname={pathname}
          searchTerm={searchTerm}
          token={token}
        />
      </div>
      {womenAccessories.length !== 0 && (
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
  const res = await fetch(`${API_URL}/women-accessories`);

  const womenAccessories = await res.json();
  getStartAndEndValueForPagination(womenAccessories, page);

  return {
    props: {
      womenAccessories: womenAccessories.slice(values.start, values.end),
      token: token,
      totalPages: values.totalPages,
    },
  };
}
