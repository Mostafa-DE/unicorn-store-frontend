import styles from "@/styles/Layout.module.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import ButtonScrollUp from "./ButtonScrollUp";
import ButtonWhatsApp from "./ButtonWhatsApp";

/*-------------components--------------*/
import Header from "./Header";
import Footer from "./Footer";
/*------------------X------------------*/

export default function Layout({ title, description, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title> {title} </title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      {router.pathname === "/" && (
        <div data-aos="fade-in" className={styles.coverHome}>
          <div className={styles.containerCoverText}>
            <p> أيام أكثر إشراقاً</p>
            <span>تسوق عروض الموسم الجديد</span>
            <Link href="/categories/women-fashions/turkey-dresses/dresses">
              <button className={styles.exploreBtn}>إكتشف الآن</button>
            </Link>
          </div>
        </div>
      )}

      <div className={styles.container}> {children} </div>
      <Footer />
      <ButtonScrollUp />
      <ButtonWhatsApp />
    </div>
  );
}

/*------------default title in case i forget to add title-----------*/
Layout.defaultProps = {
  title: "Unicorn Store | Shop Online For Fashions, Tools, Gifts & More",
  description:
    "Unicorn Store | Shop Online for Electronics, Toys, Beauty, Tools & More. Exclusive Products. Same Day Delivery. Cash on Delivery.",
};
/*---------------------------------X--------------------------------*/
