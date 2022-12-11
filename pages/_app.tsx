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

function MyApp({Component, pageProps, router}) {
    useEffect(() => {
        AOS.init({
            duration: 2000
        });
    }, []);

    return (
        <>
            <script
                src="https://unpkg.com/react/umd/react.production.min.js"
                crossOrigin={"true"}
            />

            <script
                src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
                crossOrigin={"true"}
            />

            <script
                src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
                crossOrigin={"true"}
            />

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
            <AuthProvider>
                <BagProvider>
                    <WishBagProvider>
                        <CompareProvider>
                            <ShippingInfoProvider>
                                <LanguageProvider>
                                    <Component {...pageProps} />
                                </LanguageProvider>
                            </ShippingInfoProvider>
                        </CompareProvider>
                    </WishBagProvider>
                </BagProvider>
            </AuthProvider>
            {/*</motion.div>*/}
            {/*</AnimatePresence>*/}
        </>
    );
}

export default MyApp;
