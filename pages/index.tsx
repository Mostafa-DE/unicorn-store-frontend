import Layout from "@/components/Layout/Layout";
import { useEffect } from "react";
import CategoriesPhoto from "@/components/CategoriesPhoto/CategoriesPhoto";
import { API_URL } from "@/config/index";
import CarouselDresses from "@/components/CarouselDresses/CarouselDresses";
import { parseCookies } from "@/helpers/index";
import SubscribeForm from "@/components/SubscripeForm/SubscripeForm";
import PropertiesOurPage from "@/components/PropertiesOurPage/PropertiesOurPage";
import {AiOutlineLine} from "react-icons/ai";

export default function Home({ products, token, userAccount, newArrivals = [], offers = [] }) {
  useEffect(() => {
    window.localStorage.removeItem("shippingInformation");
  }, []);

  return (
    <>
      <Layout
          userAccount={userAccount}
          title="Unicorns Store | Shop Online For Fashions, Tools, Gifts & More"
      >

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
  const urls = [`midi-dresses`, `long-dresses`, `off-dresses`, "a-dresses"];
  const AllProductsArray = [];

  try {
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
  } catch(e) {
    console.log(e);
  }

  let newArrivals = [];
  try {
    const res = await fetch(`${API_URL}/new-arrivals?_limit=20`);
    newArrivals = await res.json();
  } catch (error) {
    console.log(error);
  }

  let offers = [];
  try {
    const res = await fetch(`${API_URL}/offers?_limit=20`);
    offers = await res.json();
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
      products: AllProductsArray,
      token: token,
      userAccount: userAccount,
      newArrivals: newArrivals,
      offers: offers,
    },
  };
}
