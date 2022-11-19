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

export default function OtherProducts({
  turkeyWomenProducts,
  token,
  totalPages,
}) {
  const pathname = "/categories/women-fashions/turkey-all-products";
  const [searchTerm, handleChange] = useSearch();
  const [page, handleChangePage] = usePagination();

  return (
    <Layout title="Women_Turkey_Fashions">
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">جميع المنتجات التركية</h1>
        <AiOutlineLine className="lineIcon" />
      </div>

      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={turkeyWomenProducts}
          pathname={pathname}
          searchTerm={searchTerm}
          token={token}
        />
      </div>
      {turkeyWomenProducts.length !== 0 && (
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
  const res = await fetch(`${API_URL}/turkey-women-products`);

  const turkeyWomenProducts = await res.json();

  getStartAndEndValueForPagination(turkeyWomenProducts, page);
  return {
    props: {
      turkeyWomenProducts: turkeyWomenProducts.slice(values.start, values.end),
      token: token,
      totalPages: values.totalPages,
    },
  };
}
