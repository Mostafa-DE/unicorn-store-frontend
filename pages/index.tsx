import Layout from "@/components/Layout/Layout";
import {useEffect} from "react";
import {API_URL} from "@/config/index";
import CarouselDresses from "@/components/CarouselDresses/CarouselDresses";
import {parseCookies} from "@/helpers/index";
import SubscribeForm from "@/components/SubscripeForm/SubscripeForm";
import PropertiesOurPage from "@/components/PropertiesOurPage/PropertiesOurPage";
import {AiOutlineLine} from "react-icons/ai";
import {IProduct} from "@/Models/types";
import CategoriesPhoto from "@/components/CategoriesPhoto/CategoriesPhoto";

type HomeProps = {
    products: IProduct[];
    token: string;
    userAccount: any;
};

export default function Home({products, token, userAccount}: HomeProps) {
    useEffect(() => {
        window.localStorage.removeItem("shippingInformation");
    }, []);

    const newArrivals = products.filter((product) => product.newArrival === true);
    const offers = products.filter((product) => product.discount);

    return (
        <>
            <Layout
                userAccount={userAccount}
                title="Unicorns Store | Shop Online For Fashions, Tools, Gifts & More"
            >

                <CategoriesPhoto/>

                <div>
                    <div className="containerTitle">
                        <h1 className="h1Title" data-aos="zoom-in" data-aos-once="true">
                            Top Products
                        </h1>
                        <AiOutlineLine className="lineIcon"/>
                    </div>
                    <CarouselDresses token={token} products={products}/>
                </div>
                {
                    newArrivals.length > 0 && (
                        <div>
                            <div className="containerTitle">
                                <h1 className="h1Title" data-aos="zoom-in" data-aos-once="true">
                                    New Arrivals
                                </h1>
                                <AiOutlineLine className="lineIcon"/>
                            </div>
                            <CarouselDresses token={token} products={newArrivals}/>
                        </div>
                    )
                }
                {
                    offers.length > 0 && (
                        <div>
                            <div className="containerTitle">
                                <h1 className="h1Title" data-aos="zoom-in" data-aos-once="true">
                                    Offers
                                </h1>
                                <AiOutlineLine className="lineIcon"/>
                            </div>
                            <CarouselDresses token={token} products={offers}/>
                        </div>
                    )
                }

                <PropertiesOurPage/>

                <SubscribeForm/>
            </Layout>
        </>
    );
}

export async function getServerSideProps({req}) {
    const {token = null} = parseCookies(req);

    let products = [];
    try {
        const res = await fetch(`${API_URL}/all-products`)
        products = await res.json()
    } catch (error) {
        console.log(error)
    }


    let userAccount = null;
    try {
        const resAccount = await fetch(`${API_URL}/users/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        userAccount = await resAccount.json();
    } catch (error) {
        console.log(error);
    }

    return {
        props: {
            products,
            token,
            userAccount
        },
    };
}
