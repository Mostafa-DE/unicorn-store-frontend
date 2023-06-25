import {API_URL} from "@/config/index";
import Layout from "@/components/Layout/Layout";
import SearchInput from "@/components/SearchInput/SearchInput";
import {parseCookies} from "@/helpers/index";
import {AiOutlineLine} from "react-icons/ai";
import useSearch from "@/Hooks/useSearch";
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

export default function Packages({packages, token, totalPages}) {
    const pathname = "/categories/packages";
    const [searchTerm, handleChange] = useSearch();
    const [page, handleChangePage] = usePagination();

    return (
        <Layout title="Packages & Gifts & More">
            <div data-aos="fade-in" className="containerTitle">
                <h1 className="h1Title"> قسم الهدايا والباكيجات</h1>
                <AiOutlineLine className="lineIcon"/>
            </div>

            <SearchInput searchTerm={searchTerm} handleChange={handleChange}/>
            <div className="containerCardProducts">
                <DynamicProductsWithSearch
                    productsData={packages}
                    pathname={pathname}
                    searchTerm={searchTerm}
                    token={token}
                />
            </div>
            {packages.length !== 0 && (
                <DynamicPagination
                    page={page}
                    totalPages={totalPages}
                    handleChangePage={handleChangePage}
                />
            )}
        </Layout>
    );
}

export async function getServerSideProps({req, query: {page = 1}}) {
    const {token = null} = parseCookies(req);
    const res = await fetch(`${API_URL}/packages`);

    const packages = await res.json();
    getStartAndEndValueForPagination(packages, page);

    return {
        props: {
            packages: packages.slice(values.start, values.end),
            token: token,
            totalPages: values.totalPages,
        },
    };
}
