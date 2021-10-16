import styles from "@/styles/ButtonWhatsApp.module.css";
import { useState, useEffect } from "react";
import { ImWhatsapp } from "react-icons/im";

export default function ButtonWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleVisibility);
    return () => window.removeEventListener("scroll", handleVisibility);
  });
  return (
    <>
      {isVisible && (
        <div className={styles.containerBtn}>
          <p className={styles.ButtonWhatsApp}>
            <a href="https://wa.me/message/HRQFZDWSM3EUH1">
              <ImWhatsapp className={styles.whatsAppIcon} /> تواصل معنا
            </a>
          </p>
        </div>
      )}
    </>
  );
}
