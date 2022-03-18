import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import {IoIosArrowDown} from "react-icons/io";
import {languages} from "@/components/Header/TranslateText";

export function WomanCollections({language}) {
    const {titleWomen, allProducts, EveningDresses, Lingerie, AbayasAndQatafin, TurkishMade, localMade} = languages[language];
    return (
        <div className={styles.dropDown}>
            <li className={styles.linkProducts}>
                {titleWomen}<IoIosArrowDown/>
            </li>
            <div className={styles.dropDownContent}>
                <div className={styles.containerDropDownContent}>
                    <div className={styles.collectionsDiv}>
                        <span>{TurkishMade}</span>
                        <ul>
                            <li>
                                <Link href="/categories/women-fashions/turkey-dresses/dresses">
                                    <a className={styles.categoryLink}>{EveningDresses}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/women-fashions/turkey-lingeries/lingerie">
                                    <a className={styles.categoryLink}>{Lingerie}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/women-fashions/turkey-abayas/abaya">
                                    <a className={styles.categoryLink}>{AbayasAndQatafin}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/women-fashions/turkey-all-products/other-products">
                                    <a
                                        className={`${styles.categoryLink} ${styles.collectionText}`}
                                        style={{padding: "1rem 0 2rem 0"}}
                                    >
                                        {allProducts}
                                    </a>
                                </Link>
                            </li>
                        </ul>

                        <span>{localMade}</span>
                        <ul>
                            <li>
                                <Link href="/categories/women-fashions/local-dresses/dresses">
                                    <a className={styles.categoryLink}>{EveningDresses}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/women-fashions/local-lingeries/lingerie">
                                    <a className={styles.categoryLink}>{Lingerie}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/women-fashions/local-abayas/abaya">
                                    <a className={styles.categoryLink}>{AbayasAndQatafin}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/women-fashions/local-all-products/other-products">
                                    <a
                                        className={styles.categoryLink}
                                        style={{padding: "1rem 0 2rem 0"}}
                                    >
                                        {allProducts}
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <img
                            src="/images/unicorn/women fashions.jpg"
                            width={380}
                            height={521}
                            className={styles.img}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
