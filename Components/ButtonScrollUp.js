import styles from "@/styles/ButtonScrollUp.module.css";
import { useState, useEffect } from "react";
import { MdArrowUpward } from "react-icons/md";

export default function ButtonScrollUp() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", handleVisibility);
  });

  return (
    <div className={styles.scrollUpContainer}>
      {isVisible && (
        <div onClick={scrollUp} className={styles.scrollUpBtn}>
          <MdArrowUpward className={styles.rowIcon} />
        </div>
      )}
    </div>
  );
}
