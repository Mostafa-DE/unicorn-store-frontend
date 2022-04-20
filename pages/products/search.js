import Search from "@/components/Search";
import Layout from "@/components/Layout";
import qs from "qs";
import {API_URL} from "@/config/index";
import {parseCookies} from "@/helpers/index";
import {getStartAndEndValueForPagination, values} from "@/helpers/paginationLogic";
import Pagination from "@/components/Pagination"
import usePagination from "@/Hooks/usePagination"

export default function SearchPage({products, token, totalPages}) {
    const [page, handleChangePage] = usePagination(1);

    const isProductExist = (products) => {
        if (!products) return;
        for (let product of products) {
            if (product.length !== 0) return true
        }
        return false
    }

    return (
        <Layout title="Search_Page">
            <Search products={products}
                    token={token}
            />
            {!isProductExist(products) && (
                <div className="containerSearchResults">
                    <h1>😔 لا شيء هنا</h1>
                    <p className="text-center">
                        لم نتمكن من العثور على المنتج ، ربما لم يكن موجودًا أو غير متوفر
                        حالياً
                    </p>
                </div>
            )}

            {isProductExist(products) && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handleChangePage={handleChangePage}
                />
            )}


        </Layout>
    );
}

export async function getServerSideProps({req, query: {term, page = 1}}) {
    const {token = null} = parseCookies(req);
    const query = qs.stringify({
        _where: {
            _or: [
                {name_contains: term},
                {description_contains: term},
            ],
        },
    });
    if (!term) return {props: {}};
    const urls = [
        `turkey-dresses`,
        `turkey-women-products`,
        `turkey-lingeries`,
        `turkey-abayas`,
        `local-lingeries`,
        `local-dresses`,
        `local-women-products`,
        `local-abayas`,
        `men-products`,
        `men-pajamas`,
        `kids-products`,
        `kids-dresses`,
        `kids-pajamas`,
        `kids-accessories`,
        `men-watches`,
        `women-accessories`,
        `bracelets`,
        `necklaces`,
        `rings`
    ]
    const AllProductsArray = [];

    await Promise.all(
        urls.map(url => fetch(`${API_URL}/${url}?${query}`).then(res => res.json()).then(product => AllProductsArray.push(product))
        ))

    getStartAndEndValueForPagination(AllProductsArray.flat(), page);

    return {
        props: {
            products: AllProductsArray.flat().slice(values.start, values.end),
            token: token,
            totalPages: values.totalPages
        },
    };
}