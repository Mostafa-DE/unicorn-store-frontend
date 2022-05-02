import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import {IoIosArrowDown} from "react-icons/io";
import {languages} from "@/components/Header/TranslateText";

export function MenCollections({language}) {
    const {titleMen, allProducts, pajamas} = languages[language];
    return (
        <div className={styles.dropDown}>
            <li className={styles.linkProducts}>
                {titleMen}<IoIosArrowDown className={styles.icon}/>
            </li>
            <div className={styles.dropDownContent}>
                <div className={styles.containerDropDownContent}>
                    <div className={styles.collectionsDiv}>
                        <ul>
                            <li>
                                <Link href="/categories/men-fashions/men-pajamas/pajamas">
                                    <a className={styles.categoryLink}>{pajamas}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/men-fashions/all-products/other-products">
                                    <a className={styles.categoryLink}>{allProducts}</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.img}>
                        <img
                            src="/images/unicorn/men fashions.jpg"
                            width={400}
                            height={380}
                            className={styles.img}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
