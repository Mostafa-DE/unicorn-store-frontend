import styles from "@/components/Layout/Layout.module.css";
import React, {useContext, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/dist/client/router";
import ButtonScrollUp from "../ButtonScrollUp/ButtonScrollUp";
import ButtonWhatsApp from "../ButtonWhatsapp/ButtonWhatsApp";
import NProgress from "nprogress";
import {languages} from "./TranslateText"
import {LanguageContext} from "@/context/LanguageContext";
import Footer from "../Footer/Footer";
import dynamic from "next/dynamic";


export interface ILayoutProps {
    title: string;
    children: React.ReactNode;
    description?: string;
    userAccount?: unknown;
}

const Layout: React.FC<ILayoutProps> = (
    {
        title,
        description,
        children,
        userAccount,
    }) => {
    const router = useRouter();

    // @ts-ignore
    const {language} = useContext(LanguageContext)
    // @ts-ignore
    const {mainTitle, secondTitle, btnText} = languages[language];

    /*---------n progress to show progress for each click--------*/
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

    const DynamicHeader: React.ComponentType = dynamic(
        () => import('@/components/Header'),
        {
            loading: () => <p>Loading...</p>,
        })

    const DynamicChatBot: React.ComponentType = dynamic(
        () => import('@/components/ChatBot'),
        {
            loading: () => <p>Loading...</p>,
        })

    const DynamicBottomNavigation: React.ComponentType = dynamic(
        () => import('@/components/BottomNavigation'),
        {
            loading: () => <p>Loading...</p>,
        })

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
            <DynamicHeader/>
            {router.pathname === "/" && (
                <div data-aos="fade-in"
                     data-aos-once='true'
                     className={styles.coverHome}
                >
                    <div
                        className={language === "arabic" ? styles.containerCoverTextArabic : styles.containerCoverText}>
                        <p> {mainTitle} </p>
                        <span> {secondTitle} </span>
                        <Link href="/categories/women-fashions/turkey-dresses/dresses" passHref={true}>
                            <button className={styles.exploreBtn}> {btnText} </button>
                        </Link>
                    </div>
                </div>
            )}

            <div className={styles.container}> {children} </div>
            <DynamicBottomNavigation/>
            <Footer/>

            {/* TODO: Still JS, couldn't switch to TS, compatibility issue we should consider change the library */}
            {/* @ts-ignore */}
            <DynamicChatBot userAccount={userAccount}/>

            <ButtonScrollUp/>
            <ButtonWhatsApp/>
        </div>
    );
}

export default Layout;

/*------------default title in case i forget to add title-----------*/
Layout.defaultProps = {
    title: "Unicorns Store | Shop Online For Fashions, Tools, Gifts & More",
    description:
        "Unicorn Store | Shop Online for Electronics, Toys, Beauty, Tools & More. Exclusive Products. Same Day Delivery. Cash on Delivery."
};
/*---------------------------------X--------------------------------*/
