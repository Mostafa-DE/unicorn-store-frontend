import {API_URL} from "@/config/index";
import Layout from "@/components/Layout/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput/SearchInput";
import ProductsWithSearch from "@/components/ProductsWithSearch/ProductsWithSearch";
import {AiOutlineLine} from "react-icons/ai";
import {parseCookies} from "@/helpers/index";
import {getStartAndEndValueForPagination, values} from "@/helpers/paginationLogic";
import Pagination from "@/components/Pagination"
import usePagination from "@/Hooks/usePagination"

export default function Lingeries({localLingeries, token, totalPages}) {
    const pathname = "/categories/women-fashions/local-lingeries";
    const [searchTerm, handleChange] = useSearch("");
    const [page, handleChangePage] = usePagination(1);

    return (
        <Layout title="Women_Local_Lingeries">
            <div data-aos="fade-in"
                 className="containerTitle"
            >
                <h1 className="h1Title">قسم اللانجري المحلي</h1>
                <AiOutlineLine className="lineIcon"/>
            </div>
            <SearchInput searchTerm={searchTerm}
                         handleChange={handleChange}
            />
            <div className="containerCardProducts">
                <ProductsWithSearch
                    productsData={localLingeries}
                    pathname={pathname}
                    searchTerm={searchTerm}
                    token={token}
                />
            </div>
            {localLingeries.length !== 0 && (
                <Pagination
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
    const res = await fetch(`${API_URL}/local-lingeries`);

    const localLingeries = await res.json();
    getStartAndEndValueForPagination(localLingeries, page);

    return {
        props: {
            localLingeries: localLingeries.slice(values.start, values.end),
            token: token,
            totalPages: values.totalPages,
        }
    };
}
