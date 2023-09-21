import styles from "@/components/Layout/Layout.module.css";
import React, {useEffect} from "react";
import Head from "next/head";
import {useRouter} from "next/dist/client/router";
import ButtonScrollUp from "../ButtonScrollUp/ButtonScrollUp";
import ButtonWhatsApp from "../ButtonWhatsapp/ButtonWhatsApp";
import NProgress from "nprogress";
import Footer from "../Footer/Footer";
import dynamic from "next/dynamic";
import {Skeleton} from "@mui/material";


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
            loading: () => (
                <Skeleton animation="wave" height={120} sx={{width: "100%", position: "absolute", top: -25}}/>
            )
        })

    const DynamicChatBot: React.ComponentType = dynamic(
        () => import('@/components/ChatBot'),
        {
            loading: () => (
                <Skeleton animation="wave"
                          variant="circular"
                          sx={{
                              position: "absolute",
                              right: 0,
                              bottom: "6rem",
                          }}
                          width={55}
                          height={55}
                />
            ),
        })

    const DynamicBottomNavigation: React.ComponentType = dynamic(
        () => import('@/components/BottomNavigation'),
        {
            loading: () => (
                <Skeleton animation="wave" width={40} height={40}/>
            ),
        })

    const DynamicBanner: React.ComponentType = dynamic(
        () => import('@/components/Banner'),
        {
            loading: () => (
                <Skeleton animation="wave" height={550} sx={{width: "100%"}}/>
            ),
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
            {
                router.pathname === "/" && (
                    <DynamicBanner/>
                )
            }

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
