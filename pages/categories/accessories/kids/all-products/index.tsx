import {API_URL, NEXT_URL} from "@/config/index";
import Layout from "@/components/Layout/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch/ProductsWithSearch";
import {AiOutlineLine} from "react-icons/ai";
import {parseCookies} from "@/helpers/parseCookies";
import {
    getStartAndEndValueForPagination,
    values,
} from "@/helpers/paginationLogic";
import Pagination from "@/components/Pagination";
import usePagination from "@/Hooks/usePagination";

export default function AccessoriesKids({products, totalPages}) {
    console.log(products)
    const pathname = "/categories/accessories/kids/all-products";
    const [searchTerm, handleChange] = useSearch();
    const [page, handleChangePage] = usePagination();

    return (
        <>
            <div data-aos="fade-in" className="containerTitle">
                <h1 className="h1Title">إكسسوارات الأطفال</h1>
                <AiOutlineLine className="lineIcon"/>
            </div>
            <SearchInput searchTerm={searchTerm} handleChange={handleChange}/>
            <div className="containerCardProducts">
                <ProductsWithSearch
                    products={products}
                    pathname={pathname}
                    searchTerm={searchTerm}
                />
            </div>
            {products.length !== 0 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handleChangePage={handleChangePage}
                />
            )}
        </>
    );
}

export async function getServerSideProps({req, query: {page = 1}}) {

    const res = await fetch(`${NEXT_URL}/api/products/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url: "api/turkey-dresses/products"
        })
    });

    const products = await res.json();
    getStartAndEndValueForPagination(products, page);

    return {
        props: {
            products,
            // kidsAccessories: kidsAccessories.slice(values.start, values.end),
            totalPages: values.totalPages,
        },
    };
}
