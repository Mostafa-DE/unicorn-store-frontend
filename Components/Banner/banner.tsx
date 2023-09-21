import {useRouter} from "next/router";
import styles from "./banner.module.css";
import {useContext} from "react";
import {LanguageContext} from "@/context/LanguageContext";
import {languages} from "@/components/Layout/TranslateText";
import Link from "next/link";

export default function Banner(): JSX.Element {
    const router = useRouter();

    // @ts-ignore
    const {language} = useContext(LanguageContext)
    const {mainTitle, secondTitle, btnText} = languages[language];

    return (
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

    );
}
