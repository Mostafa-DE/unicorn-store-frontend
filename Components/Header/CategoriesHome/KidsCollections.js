import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import {IoIosArrowDown} from "react-icons/io";
import {languages} from "@/components/Header/TranslateText";

export function KidsCollections({language}) {
    const {titleKids, allProducts, pajamas, dresses, TurkishMade} = languages[language];
    return (
        <div className={styles.dropDown}>
            <li className={styles.linkProducts}>
                {titleKids}<IoIosArrowDown/>
            </li>
            <div className={styles.dropDownContent}>
                <div className={styles.containerDropDownContent}>
                    <div className={styles.collectionsDiv}>
                        <span>{TurkishMade}</span>
                        <ul>
                            <li>
                                <Link href="/categories/kids-fashions/kids-pajamas/pajamas">
                                    <a className={styles.categoryLink}>{pajamas}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/kids-fashions/kids-dresses/dresses">
                                    <a className={styles.categoryLink}>{dresses}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/kids-fashions/all-products/other-products">
                                    <a className={styles.categoryLink}>{allProducts}</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.img}>
                        <img
                            src="/images/unicorn/kids fashions.jpg"
                            width={400}
                            height={400}
                            className={styles.img}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
