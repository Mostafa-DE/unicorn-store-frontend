import styles from "@/components/Layout/Layout.module.css";
import React, {useContext, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/dist/client/router";
import ButtonScrollUp from "../ButtonScrollUp/ButtonScrollUp";
import ButtonWhatsApp from "../ButtonWhatsapp/ButtonWhatsApp";
import NProgress from "nprogress";
import BottomNavigation from "@/components/BottomNavigation"
import {languages} from "./TranslateText"
import {LanguageContext} from "@/context/LanguageContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ChatBot from "../ChatBot/ChatBot";
import {AuthContext} from "@/context/AuthContext";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";


export interface ILayoutProps {
    title: string;
    children: React.ReactNode;
    description?: string;
}

const Layout: React.FC<ILayoutProps> = ({title, description, children}) => {
    const router = useRouter();

    // @ts-ignore
    const {language} = useContext(LanguageContext)
    // @ts-ignore
    const {mainTitle, secondTitle, btnText} = languages[language];

    const {user, message, setMessage} = useContext(AuthContext);

    // n progress to show page progress
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

    function handleClose() {
        setMessage(null);
    }

    return (
        <div>
            <Head>
                <title> {title} </title>
                <meta name="description" content={description}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="theme-color" content="#fb9aa7"/>
                <link rel="icon" href="/images/unicorn.png"/>
            </Head>
            <Header/>
            <Stack spacing={2} sx={{width: '100%'}}>
                <Snackbar open={message !== null && true} autoHideDuration={10000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{position: "fixed", top: 100, right: "40%"}}>
                        {message}
                    </Alert>
                </Snackbar>
            </Stack>
            {router.pathname === "/" && (
                <div data-aos="fade-in"
                     data-aos-once='true'
                     className={styles.coverHome}
                >
                    <div
                        className={language === "arabic" ? styles.containerCoverTextArabic : styles.containerCoverText}>
                        <p> {mainTitle} </p>
                        <span> {secondTitle} </span>
                        <Link href="/categories/women-fashions/turkey-dresses/dresses">
                            <button className={styles.exploreBtn}> {btnText} </button>
                        </Link>
                    </div>
                </div>
            )}

            <div className={styles.container}> {children} </div>
            <BottomNavigation/>
            <Footer/>

            <ChatBot userAccount={user}/>

            <ButtonScrollUp/>
            <ButtonWhatsApp/>
        </div>
    );
}

export default Layout;

Layout.defaultProps = {
    title: "Unicorns Store | Shop Online For Fashions, Tools, Gifts & More",
    description:
        "Unicorn Store | Shop Online for Electronics, Toys, Beauty, Tools & More. Exclusive Products. Same Day Delivery. Cash on Delivery."
};
