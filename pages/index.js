import Layout from "@/components/Layout/Layout";
import {useEffect} from "react";
import CategoriesPhoto from "@/components/CategoriesPhoto/CategoriesPhoto";
import {API_URL} from "@/config/index";
import CarouselDresses from "@/components/CarouselDresses/CarouselDresses";
import {parseCookies} from "@/helpers/index";
import SubscripeForm from "@/components/SubscripeForm/SubscripeForm";
import PropertiesOurPage from "@/components/PropertiesOurPage/PropertiesOurPage";
import ErrorComponent from "@/components/ErrorComponent"

export default function Home({products, token, userAccount, isServerDown}) {

    useEffect(() => {
        window.localStorage.removeItem("shippingInformation");
    }, []);

    return (
        <>
            {!isServerDown ? (
                <Layout
                    userAccount={userAccount}
                    title="Unicorns Store | Shop Online For Fastions, Tools, Gifts & More"
                >
                    <CategoriesPhoto/>

                    <CarouselDresses
                        token={token}
                        products={products}
                    />

                    <PropertiesOurPage/>

                    <SubscripeForm/>
                </Layout>
            ) : (
                <ErrorComponent
                    reaction="OOPS!"
                    statusError="503 - Service Unavailable"
                    ErrorMessage="The server is temporarily unavailable, Please try again later!!"
                    hideBackButton={true}
                />
            )}
        </>
    );
}

export async function getServerSideProps({req}) {
    try {
        const {token = null} = parseCookies(req);
        const urls = [
            `turkey-dresses`,
            `local-abayas`,
            `men-pajamas`,
        ]
        const AllProductsArray = [];

        await Promise.all(
            urls.map(url => fetch(`${API_URL}/${url}?_limit=5`).then(res => res.json()).then(product => AllProductsArray.push(product))
            ))

        const resAccount = await fetch(`${API_URL}/users/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const userAccount = await resAccount.json();

        return {
            props: {
                products: AllProductsArray,
                token: token,
                userAccount: userAccount,
            }
        }
    } catch (err) {
        let isServerDown = true
        return {
            props: {
                isServerDown
            }
        }
    }
}
