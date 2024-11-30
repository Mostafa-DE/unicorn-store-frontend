import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import {parseCookies} from "@/helpers/index";
import {getStartAndEndValueForPagination, values,} from "@/helpers/paginationLogic";
import Pagination from "@/components/Pagination";
import usePagination from "@/Hooks/usePagination";
import {AiOutlineLine} from "react-icons/ai";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch/ProductsWithSearch";

export default function SearchPage({products, token, totalPages}) {
    const pathname = "/categories/women-fashions/a-dresses";
    const [searchTerm, handleChange] = useSearch();
    const [page, handleChangePage] = usePagination();

    return (
        <Layout title="All Products">
            <div data-aos="fade-in" className="containerTitle">
                <h1 className="h1Title">
                    All Products
                </h1>
                <AiOutlineLine className="lineIcon"/>
            </div>

            <SearchInput searchTerm={searchTerm} handleChange={handleChange}/>
            <div className="containerCardProducts">
                <ProductsWithSearch
                    productsData={products}
                    pathname={pathname}
                    searchTerm={searchTerm}
                    token={token}
                />
            </div>
            {products.length !== 0 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handleChangePage={handleChangePage}
                />
            )}
        </Layout>
    );
}

export async function getServerSideProps({req}) {
    const {token = null} = parseCookies(req);

    let products = [];
    try {
        const res = await fetch(`${API_URL}/all-products`)
        products = await res.json()
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            products: products,
            token: token,
            totalPages: values.totalPages,
        },
    };
}
