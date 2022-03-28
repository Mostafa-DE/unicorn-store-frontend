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
    const resTurkeyDresses = await fetch(`${API_URL}/turkey-dresses?${query}`);
    const resTurkeyWomenProducts = await fetch(`${API_URL}/turkey-women-products?${query}`);
    const resTurkeyLingeries = await fetch(`${API_URL}/turkey-lingeries?${query}`);
    const resTurkeyAbayas = await fetch(`${API_URL}/turkey-abayas?${query}`);
    const resLocalLingeries = await fetch(`${API_URL}/local-lingeries?${query}`);
    const resLocalDresses = await fetch(`${API_URL}/local-dresses?${query}`);
    const resLocalWomenProducts = await fetch(`${API_URL}/local-women-products?${query}`);
    const resLocalAbayas = await fetch(`${API_URL}/local-abayas?${query}`);
    const resMenProducts = await fetch(`${API_URL}/men-products`);
    const resMenPagamas = await fetch(`${API_URL}/men-pajamas`);
    const resKidsProducts = await fetch(`${API_URL}/kids-products`);
    const resKidsDresses = await fetch(`${API_URL}/kids-dresses`);
    const resKidsPajamas = await fetch(`${API_URL}/kids-pajamas`);


    const AllProductsArray = [];
    AllProductsArray.push(
        await resTurkeyDresses.json(),
        await resTurkeyWomenProducts.json(),
        await resTurkeyLingeries.json(),
        await resTurkeyAbayas.json(),
        await resLocalLingeries.json(),
        await resLocalDresses.json(),
        await resLocalWomenProducts.json(),
        await resLocalAbayas.json(),
        await resMenProducts.json(),
        await resMenPagamas.json(),
        await resKidsProducts.json(),
        await resKidsDresses.json(),
        await resKidsPajamas.json(),
    );

    getStartAndEndValueForPagination(AllProductsArray, page);

    return {
        props: {
            products: AllProductsArray.slice(values.start, values.end),
            token: token,
            totalPages: values.totalPages
        },
    };
}