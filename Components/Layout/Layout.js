import styles from "@/components/Layout/Layout.module.css";
import {useContext, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/dist/client/router";
import ButtonScrollUp from "../ButtonScrollUp/ButtonScrollUp";
import ButtonWhatsApp from "../ButtonWhatsapp/ButtonWhatsApp";
import NProgress from "nprogress";
import BootomNavigation from "@/components/BottomNavigation"
import {languages} from "./TranslateText"
import {LanguageContext} from "@/context/LanguageContext";

/*-------------components--------------*/
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ChatBot from "../ChatBot/ChatBot";
/*------------------X------------------*/

export default function Layout({title, description, children, userAccount}) {
    const router = useRouter();

    const {language} = useContext(LanguageContext)
    const {mainTitle, secondTitle, btnText} = languages[language];

    /*---------n progress to show prgress for each click--------*/
    useEffect(() => {
        const onRouterChangeStart = () => {
            NProgress.start();
        };
        const onRouteChangeComplete = () => {
            NProgress.done();
        };
        const onRouteChangeError = () => {
            NProgress.done();
        };
        router.events.on("routeChangeStart", onRouterChangeStart);
        router.events.on("routeChangeComplete", onRouteChangeComplete);
        router.events.on("routeChangeError", onRouteChangeError);

        return () => {
            router.events.off("routeChangeStart", onRouterChangeStart);
            router.events.off("routeChangeComplete", onRouteChangeComplete);
            router.events.off("routeChangeError", onRouteChangeError);
        };
    });
    /*-----------------------------x----------------------------*/

    return (
        <div>
            <Head>
                <title> {title} </title>
                <meta name="description"
                      content={description}
                />
                <meta name="viewport"
                      content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color"
                      content="#fb9aa7"
                />
                <link rel="icon"
                      href="/images/unicorn.png"
                />
            </Head>
            <Header/>
            {router.pathname === "/" && (
                <div data-aos="fade-in"
                     className={styles.coverHome}
                >
                    <div className={language === "arabic" ? styles.containerCoverTextArabic : styles.containerCoverText}>
                        <p> {mainTitle} </p>
                        <span> {secondTitle} </span>
                        <Link href="/categories/women-fashions/turkey-dresses/dresses">
                            <button className={styles.exploreBtn}> {btnText} </button>
                        </Link>
                    </div>
                </div>
            )}

            <div className={styles.container}> {children} </div>
            <BootomNavigation />
            <Footer/>

            <ChatBot userAccount={userAccount}/>

            <ButtonScrollUp/>
            <ButtonWhatsApp/>
        </div>
    );
}

/*------------default title in case i forget to add title-----------*/
Layout.defaultProps = {
    title: "Unicorns Store | Shop Online For Fashions, Tools, Gifts & More",
    description:
        "Unicorn Store | Shop Online for Electronics, Toys, Beauty, Tools & More. Exclusive Products. Same Day Delivery. Cash on Delivery."
};
/*---------------------------------X--------------------------------*/
