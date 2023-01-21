import Layout from "@/components/Layout/Layout";
import {API_URL, NEXT_URL} from "@/config/index";
import ProductDetails from "@/components/ProductDetails";
import {parseCookies} from "@/helpers/parseCookies";
import qs from "qs";

export default function ProductDetailsPage({product, token, reviews}) {
    return (
        <>
            {/*{product.map((product) => (*/}
            <ProductDetails
                token={token}
                key={product.id}
                product={product}
                reviews={reviews}
            />
            {/*))}*/}
        </>
    );
}

export async function getServerSideProps({req, query: {slug}}) {
    const {token = null} = parseCookies(req);


    const res = await fetch(`${NEXT_URL}/api/products/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url: `api/turkey-dresses/products/${slug}`,
        })
    });

    const product = await res.json();

    // const res = await fetch(`${API_URL}/kids-accessories?slug=${slug}`);
    // const product = await res.json();
    //
    // const query = qs.stringify({
    //   _where: [{ product: `/categories/accessories/kids/all-products/${slug}` }],
    // });
    //
    // const resReviews = await fetch(`${API_URL}/reviews?${query}`);
    // const reviews = await resReviews.json();

    return {
        props: {
            product,
            token,
            // reviews,
        },
    };
}
