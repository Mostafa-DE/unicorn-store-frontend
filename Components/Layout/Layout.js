import styles from "@/components/Layout/Layout.module.css";
import {useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/dist/client/router";
import ButtonScrollUp from "../ButtonScrollUp/ButtonScrollUp";
import ButtonWhatsApp from "../ButtonWhatsapp/ButtonWhatsApp";
import NProgress from "nprogress";

/*-------------components--------------*/
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ChatBot from "../ChatBot/ChatBot";
/*------------------X------------------*/

export default function Layout({title, description, children, userAccount}) {
    const router = useRouter();

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
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                    integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </Head>
            <Header/>
            {router.pathname === "/" && (
                <div data-aos="fade-in"
                     className={styles.coverHome}
                >
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
