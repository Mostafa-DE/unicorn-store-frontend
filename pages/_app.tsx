import "../styles/globals.css";
import {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {AuthProvider} from "@/context/AuthContext";
import {BagProvider} from "@/context/BagContext";
import {WishBagProvider} from "@/context/WishBagContext";
import {CompareProvider} from "@/context/CompareContext";
import {ShippingInfoProvider} from "@/context/ShippingInfoContext";
import {LanguageProvider} from "@/context/LanguageContext";
import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {NEXT_URL} from "@/config/index";
import ErrorComponent from "@/components/ErrorComponent/ErrorComponent";
import {MessageProvider} from "@/context/MessageContext";


function getPageTitle(): string {
    const router = useRouter();
    const {pathname} = router;

    if (pathname === "/account/my-account") return "Your Account Details";
    if (pathname === "/products/shopping-bag") return "Your Shopping Bag";
    if (pathname === "/account/login") return "Account Login";
    if (pathname === "/account/checkout-login") return "Checkout Login";
    if (pathname === "/account/register") return "Account Register";

    return "Unicorns Store | Shop Online For Fashions, Tools, Gifts & More";
}

function MyApp({Component, pageProps, currentUser, currentUserProfile, serverError}) {
    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);

    return (
        <>
            <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin={"true"}/>

            <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossOrigin={"true"}/>

            <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin={"true"}/>

            <script>var Alert = ReactBootstrap.Alert;</script>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
                integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
                crossOrigin="anonymous"
            />

            {/*
                Disabled because of the error:
                    ( ! ) Bug behavior: Using React 18 a component inside <AnimatePresence/> does not unmount
                                        from the DOM after the exit animation finishes.

                    Issue on GitHub: https://github.com/framer/motion/issues/1421
             */}

            {/*<AnimatePresence>*/}
            {/*    <motion.div*/}
            {/*        key={router.route}*/}
            {/*        initial="pageInitial"*/}
            {/*        animate="pageAnimate"*/}
            {/*        variants={{*/}
            {/*            pageInitial: {*/}
            {/*                opacity: 0*/}
            {/*            },*/}
            {/*            pageAnimate: {*/}
            {/*                opacity: 1*/}
            {/*            },*/}
            {/*            pageExit: {*/}
            {/*                backgroundColor: "#fb9aa7",*/}
            {/*                opacity: 0*/}
            {/*            }*/}
            {/*        }}*/}
            {/*    >*/}
            <MessageProvider>
                <AuthProvider currentUser={currentUser} currentProfile={currentUserProfile}>
                    <BagProvider>
                        <WishBagProvider>
                            <CompareProvider>
                                <ShippingInfoProvider>
                                    <LanguageProvider>
                                        {
                                            serverError ?
                                                <ErrorComponent
                                                    reaction="OOPS!"
                                                    statusError="503 - Service Unavailable"
                                                    ErrorMessage="The server is temporarily unavailable, Please try again later!!"
                                                    hideBackButton={true}
                                                /> :
                                                <Layout title={getPageTitle()}>
                                                    <Component {...pageProps} />
                                                </Layout>
                                        }
                                    </LanguageProvider>
                                </ShippingInfoProvider>
                            </CompareProvider>
                        </WishBagProvider>
                    </BagProvider>
                </AuthProvider>
            </MessageProvider>
            {/*</motion.div>*/}
            {/*</AnimatePresence>*/}
        </>
    );
}

export default MyApp;


MyApp.getInitialProps = async ({ctx}) => {
    let currentUser = null;
    let currentUserProfile = null;

    const userRes = await fetch(`${NEXT_URL}/api/auth/user`, {
        method: "GET",
        credentials: "include",
        headers: ctx.req?.headers
    });
    const profileRes = await fetch(`${NEXT_URL}/api/auth/get-user-profile`, {
        method: "GET",
        credentials: "include",
        headers: ctx.req?.headers
    });

    if (userRes.ok) currentUser = await userRes.json();
    if (profileRes.ok) currentUserProfile = await profileRes.json();

    if (userRes.status === 500) {
        return {serverError: true}
    }

    return {
        currentUser,
        currentUserProfile,
    };
};
