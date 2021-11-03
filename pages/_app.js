import "../styles/globals.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// import "../scss/style.scss";
import { AuthProvider } from "@/context/AuthContext";
import { BagProvider } from "@/context/BagContext";
import { WishBagProvider } from "@/context/WishBagContext";
import { CompareProvider } from "@/context/CompareContext";
import { ShippingInfoProvider } from "@/context/ShippingInfoContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <>
      <script
        src="https://unpkg.com/react/umd/react.production.min.js"
        crossOrigin={"true"}
      ></script>

      <script
        src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
        crossOrigin={"true"}
      ></script>

      <script
        src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossOrigin={"true"}
      ></script>

      <script>var Alert = ReactBootstrap.Alert;</script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
        integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
        crossOrigin="anonymous"
      />

      <AuthProvider>
        <BagProvider>
          <WishBagProvider>
            <CompareProvider>
              <ShippingInfoProvider>
                <Component {...pageProps} />
              </ShippingInfoProvider>
            </CompareProvider>
          </WishBagProvider>
        </BagProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
