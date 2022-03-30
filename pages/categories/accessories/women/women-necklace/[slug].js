import Layout from "@/components/Layout/Layout";
import {API_URL} from "@/config/index";
import ProductDetailsWithoutSize from "@/components/ProductDetailsWithoutSize/ProductDetailsWithoutSize";
import {parseCookies} from "@/helpers/index";

export default function ProductDetailsPage({product, token}) {
    return (
        <Layout>
            {product.map((product) => (
                <ProductDetailsWithoutSize
                    token={token}
                    key={product.id}
                    product={product}
                />
            ))}
        </Layout>
    );
}

export async function getServerSideProps({req, query: {slug}}) {
    const {token = null} = parseCookies(req)

    const res = await fetch(`${API_URL}/necklaces?slug=${slug}`);
    const product = await res.json();

    return {
        props: {
            product,
            token
        },
    };
}
