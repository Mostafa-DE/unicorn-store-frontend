import Layout from "@/components/Layout/Layout";
import dynamic from 'next/dynamic'
import {useEffect} from "react";
import {API_URL} from "@/config/index";
import {parseCookies} from "@/helpers/index";
import SubscribeForm from "@/components/SubscripeForm/SubscripeForm";
import PropertiesOurPage from "@/components/PropertiesOurPage/PropertiesOurPage";

export default function Home({products, token, userAccount}) {
    useEffect(() => {
        window.localStorage.removeItem("shippingInformation");
    }, []);


    const DynamicCategoriesPhoto = dynamic(
        () => import('@/components/CategoriesPhoto/CategoriesPhoto'),
        {
            loading: () => <p>Loading...</p>,
        })

    const DynamicCarouselDresses = dynamic(
        () => import('@/components/CarouselDresses/CarouselDresses'),
        {
            loading: () => <p>Loading...</p>,
        })

    return (
        <>
            <Layout
                userAccount={userAccount}
                title="Unicorns Store | Shop Online For Fashions, Tools, Gifts & More"
            >
                <DynamicCategoriesPhoto/>

                <DynamicCarouselDresses token={token} products={products}/>

                <PropertiesOurPage/>

                <SubscribeForm/>
            </Layout>
        </>
    );
}

export async function getServerSideProps({req}) {
    const {token = null} = parseCookies(req);
    const urls = [`turkey-dresses`, `local-abayas`, `men-pajamas`];
    const AllProductsArray = [];

    await Promise.all(
        urls.map((url) =>
            fetch(`${API_URL}/${url}?_limit=5`)
                .then((res) => res.json())
                .then((product) => {
                    if (product.length > 0 && product[0].error === undefined) {
                        AllProductsArray.push(product);
                    }
                })
        )
    );

    const resAccount = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const userAccount = await resAccount.json();

    return {
        props: {
            products: AllProductsArray,
            token: token,
            userAccount: userAccount,
        },
    };
}
