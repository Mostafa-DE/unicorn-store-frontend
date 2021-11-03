import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import CategoriesPhoto from "@/components/CategoriesPhoto";
import { API_URL } from "@/config/index";
import ProductItems from "@/components/ProductItems";
import CarouselDresses from "@/components/CarouselDresses";
import { parseCookies } from "@/helpers/index";
import CarouselBrand from "@/components/CarouselBrand";
import SubscripeForm from "@/components/SubscripeForm";

export default function Home({
  turkeyDresses,
  localAbayas,
  menPagamas,
  token,
}) {
  useEffect(() => {
    window.localStorage.removeItem("shippingInformation");
  }, []);

  const settings = {
    centerPadding: 10,
    dots: true,
    overScan: 5,
    slidesPerRow: 2,
    virtualList: true,
  };

  return (
    <Layout title="Unicorn Store | Shop Online For Fastions, Tools, Gifts & More">
      <CategoriesPhoto />

      <CarouselDresses
        token={token}
        localAbayas={localAbayas}
        turkeyDresses={turkeyDresses}
        menPagamas={menPagamas}
      />

      <SubscripeForm />

      {/* <CarouselBrand /> */}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token = null } = parseCookies(req);

  const turkeyDressesRes = await fetch(`${API_URL}/turkey-dresses?_limit=5`);
  const turkeyDresses = await turkeyDressesRes.json();

  const localAbayasRes = await fetch(`${API_URL}/local-abayas?_limit=5`);
  const localAbayas = await localAbayasRes.json();

  const menPagamasRes = await fetch(`${API_URL}/men-pajamas?_limit=5`);
  const menPagamas = await menPagamasRes.json();

  return {
    props: {
      turkeyDresses: turkeyDresses,
      localAbayas: localAbayas,
      menPagamas: menPagamas,
      token: token,
    },
  };
}
