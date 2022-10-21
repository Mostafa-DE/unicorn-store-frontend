import Search from "@/components/Search";
import Layout from "@/components/Layout";
import qs from "qs";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import {
  getStartAndEndValueForPagination,
  values,
} from "@/helpers/paginationLogic";
import Pagination from "@/components/Pagination";
import usePagination from "@/Hooks/usePagination";
import { urls, AlertProductDoesNotExist } from "@/components/Search/constants";

export default function SearchPage({ products, token, totalPages }) {
  const [page, handleChangePage] = usePagination();
  const isProductExist = (products) => {
    if (!products) return;
    for (let product of products) {
      if (product.length !== 0) return true;
    }
    return false;
  };

  return (
    <Layout title="Search_Page">
      <Search products={products} token={token} />

      {!isProductExist(products) ? (
        AlertProductDoesNotExist()
      ) : (
        <Pagination
          page={page}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, query: { term, page = 1 } }) {
  const { token = null } = parseCookies(req);
  const query = qs.stringify({
    _where: {
      _or: [{ name_contains: term }, { description_contains: term }],
    },
  });
  if (!term) return { props: {} };

  const AllProductsArray = [];

  await Promise.all(
    urls.map((url) =>
      fetch(`${API_URL}/${url}?${query}`)
        .then((res) => res.json())
        .then((product) => AllProductsArray.push(product))
    )
  );

  getStartAndEndValueForPagination(AllProductsArray.flat(), page);

  return {
    props: {
      products: AllProductsArray.flat().slice(values.start, values.end),
      token: token,
      totalPages: values.totalPages,
    },
  };
}
