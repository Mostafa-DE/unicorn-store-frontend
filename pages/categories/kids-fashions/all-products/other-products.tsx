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

export default function OtherProducts({ kidsProducts, token, totalPages }) {
  const pathname = "/categories/kids-fashions/all-products";
  const [searchTerm, handleChange] = useSearch();
  const [page, handleChangePage] = usePagination();

  return (
    <Layout title="kids_Fashions">
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title">جميع المنتجات الأخرى</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
      <div className="containerCardProducts">
        <ProductsWithSearch
          productsData={kidsProducts}
          pathname={pathname}
          searchTerm={searchTerm}
          token={token}
        />
      </div>
      {kidsProducts.length !== 0 && (
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
  const res = await fetch(`${API_URL}/kids-products`);

  const kidsProducts = await res.json();
  getStartAndEndValueForPagination(kidsProducts, page);

  return {
    props: {
      kidsProducts: kidsProducts.slice(values.start, values.end),
      token: token,
      totalPages: values.totalPages,
    },
  };
}
