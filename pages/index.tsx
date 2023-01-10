import {useEffect} from "react";
import CategoriesPhoto from "@/components/CategoriesPhoto/CategoriesPhoto";
import CarouselDresses from "@/components/CarouselDresses/CarouselDresses";
import {parseCookies} from "@/helpers/parseCookies";
import SubscribeForm from "@/components/SubscripeForm/SubscripeForm";
import PropertiesOurPage from "@/components/PropertiesOurPage/PropertiesOurPage";

export default function Home({products, token}) {
    useEffect(() => {
        window.localStorage.removeItem("shippingInformation");
    }, []);

    return (
        <>
            <CategoriesPhoto/>

            <CarouselDresses token={token} products={products}/>

            <PropertiesOurPage/>

            <SubscribeForm/>
        </>
    );
}

export async function getServerSideProps({req}) {
    const {token = null} = parseCookies(req);
    const urls = [`turkey-dresses`, `local-abayas`, `men-pajamas`];
    const AllProductsArray = [];

    // await Promise.all(
    //     urls.map((url) =>
    //         fetch(`${API_URL}/${url}?_limit=5`)
    //             .then((res) => res.json())
    //             .then((product) => {
    //                 if (product.length > 0 && product[0].error === undefined) {
    //                     AllProductsArray.push(product);
    //                 }
    //             })
    //     )
    // );

    return {
        props: {
            products: AllProductsArray,
            token: token,
        },
    };
}
