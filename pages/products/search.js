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

            {/*{isProductExist(products) && (*/}
            {/*    <Pagination*/}
            {/*        page={page}*/}
            {/*        totalPages={totalPages}*/}
            {/*        handleChangePage={handleChangePage}*/}
            {/*    />*/}
            {/*)}*/}


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
        `${API_URL}/turkey-dresses?${query}`,
        `${API_URL}/turkey-women-products?${query}`,
        `${API_URL}/turkey-lingeries?${query}`,
        `${API_URL}/turkey-abayas?${query}`,
        `${API_URL}/local-lingeries?${query}`,
        `${API_URL}/local-dresses?${query}`,
        `${API_URL}/local-women-products?${query}`,
        `${API_URL}/local-abayas?${query}`,
        `${API_URL}/men-products?${query}`,
        `${API_URL}/men-pajamas?${query}`,
        `${API_URL}/kids-products?${query}`,
        `${API_URL}/kids-dresses?${query}`,
        `${API_URL}/kids-pajamas?${query}`,
        `${API_URL}/kids-accessories?${query}`,
        `${API_URL}/men-watches?${query}`,
        `${API_URL}/women-accessories?${query}`,
        `${API_URL}/bracelets?${query}`,
        `${API_URL}/necklaces?${query}`,
        `${API_URL}/rings?${query}`
    ]
    const AllProductsArray = [];

    await Promise.all(
        urls.map(url => fetch(url).then(res => res.json()).then(product => AllProductsArray.push(product))
        ))

    // getStartAndEndValueForPagination(AllProductsArray, page);

    return {
        props: {
            products: AllProductsArray,
            token: token,
            totalPages: values.totalPages
        },
    };
}