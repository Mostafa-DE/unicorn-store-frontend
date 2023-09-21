import {API_URL} from "@/config/index";
import Layout from "@/components/Layout/Layout";
import useSearch from "@/Hooks/useSearch";
import SearchInput from "@/components/SearchInput/SearchInput";
import {AiOutlineLine} from "react-icons/ai";
import {parseCookies} from "@/helpers/index";
import {getStartAndEndValueForPagination, values} from "@/helpers/paginationLogic";
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

export default function Necklace({necklaces, token, totalPages}) {
    const pathname = "/categories/accessories/women/women-necklace";
    const [searchTerm, handleChange] = useSearch();
    const [page, handleChangePage] = usePagination();

    return (
        <Layout title="Necklaces">
            <div data-aos="fade-in" className="containerTitle">
                <h1 className="h1Title">القلادات النسائية</h1>
                <AiOutlineLine className="lineIcon"/>
            </div>
            <SearchInput searchTerm={searchTerm} handleChange={handleChange}/>
            <div className="containerCardProducts">
                <DynamicProductsWithSearch
                    productsData={necklaces}
                    pathname={pathname}
                    searchTerm={searchTerm}
                    token={token}
                />
            </div>
            {necklaces.length !== 0 && (
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
    const res = await fetch(`${API_URL}/necklaces`);

    const necklaces = await res.json();
    getStartAndEndValueForPagination(necklaces, page);

    return {
        props: {
            necklaces: necklaces.slice(values.start, values.end),
            token: token,
            totalPages: values.totalPages,
        },
    };
}
