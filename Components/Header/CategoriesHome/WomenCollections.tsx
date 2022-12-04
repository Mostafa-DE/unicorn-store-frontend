import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import {IoIosArrowDown} from "react-icons/io";
import {languages} from "@/components/Header/TranslateText";

export function WomanCollections({language}) {
    const {
        titleWomen,
        allProducts,
        EveningDresses,
        Lingerie,
        AbayasAndQatafin,
        TurkishMade,
        localMade
    } = languages[language];
    return (
        <div className={styles.dropDown}>
            <li className={styles.linkProducts}>
                {titleWomen}<IoIosArrowDown className={styles.icon}/>
            </li>
            <div className={styles.dropDownContent}>
                <div className={styles.containerDropDownContent}>
                    <div className={styles.collectionsDiv}>
                        <span>{TurkishMade}</span>
                        <ul>
                            <li>
                                <Link href="/categories/women-fashions/turkey-dresses/dresses"
                                      className={styles.categoryLink}
                                >
                                    {EveningDresses}
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/women-fashions/turkey-lingeries/lingerie"
                                      className={styles.categoryLink}
                                >
                                    {Lingerie}
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/women-fashions/turkey-abayas/abaya"
                                      className={styles.categoryLink}
                                >
                                    {AbayasAndQatafin}
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/women-fashions/turkey-all-products/other-products"
                                      className={`${styles.categoryLink} ${styles.collectionText}`}
                                >
                                    {allProducts}
                                </Link>
                            </li>
                        </ul>

                        <span>{localMade}</span>
                        <ul>
                            <li>
                                <Link href="/categories/women-fashions/local-dresses/dresses"
                                      className={styles.categoryLink}
                                >
                                    {EveningDresses}
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/women-fashions/local-lingeries/lingerie"
                                      className={styles.categoryLink}
                                >
                                    {Lingerie}
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/women-fashions/local-abayas/abaya"
                                      className={styles.categoryLink}
                                >
                                    {AbayasAndQatafin}
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/women-fashions/local-all-products/other-products"
                                      className={styles.categoryLink}
                                >
                                    {allProducts}

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
