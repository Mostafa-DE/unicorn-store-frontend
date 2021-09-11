import styles from "@/styles/Layout.module.css";

import Head from "next/head";
import { useRouter } from "next/dist/client/router";

/*-------------components--------------*/
import Header from "./Header";
import Footer from "./Footer";
import CarouselHome from "./CarouselHome";

/*------------------X------------------*/

export default function Layout({ title, description, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title> {title} </title>
        <meta name="description" content={description} />
      </Head>
      {router.pathname === "/" && <CarouselHome />}
      <Header />
      <div className={styles.container}> {children} </div>
      <Footer />
    </div>
  );
}

/*------------default title in case i forget to add title-----------*/
Layout.defaultProps = {
  title: "Unicorn Store | Shop Online For Fastions, Tools, Gifts & More",
  description:
    "Unicorn Store | Shop Online for Electronics, Toys, Beauty, Tools & More. Exclusive Products. Same Day Delivery. Cash on Delivery.",
};
/*---------------------------------X--------------------------------*/
