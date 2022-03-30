import Layout from "@/components/Layout/Layout";
import {API_URL} from "@/config/index";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import {parseCookies} from "@/helpers/index";

export default function ProductDetailsPage({product, token}) {
    return (
        <Layout>
            {product.map((product) => (
                <ProductDetails
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

    const res = await fetch(`${API_URL}/men-pajamas?slug=${slug}`);
    const product = await res.json();

    return {
        props: {
            product,
            token
        },
    };
}
