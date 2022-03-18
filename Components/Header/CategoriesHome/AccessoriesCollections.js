import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import {IoIosArrowDown} from "react-icons/io";
import {languages} from "../TranslateText"


export function AccessoriesCollections({language}) {
    const {titleAccessories, women, men, kids, necklaces, rings, bracelets, watches, allProducts,} = languages[language];

    return (
        <div className={styles.dropDown}>
            <li className={styles.linkProducts}>
                {titleAccessories}
                <IoIosArrowDown/>
            </li>
            <div className={styles.dropDownContent}>
                <div className={styles.containerDropDownContent}>
                    <div className={styles.collectionsDiv}>
                        <span>{women}</span>
                        <ul>
                            <li>
                                <Link href="/categories/accessories/women/women-necklace/necklace">
                                    <a className={styles.categoryLink}>{necklaces}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/accessories/women/women-rings/rings">
                                    <a className={styles.categoryLink}>{rings}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/accessories/women/women-bracelets/bracelets">
                                    <a className={styles.categoryLink}>{bracelets}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/accessories/women/all-products/other-products">
                                    <a className={styles.categoryLink}>{allProducts}</a>
                                </Link>
                            </li>
                        </ul>
                        <hr/>
                        <span>{men}</span>
                        <ul>
                            <li>
                                <Link href="/categories/accessories/men/men-watches/watches">
                                    <a className={styles.categoryLink}>{watches}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/accessories/men/all-products/other-products">
                                    <a className={styles.categoryLink}>{allProducts}</a>
                                </Link>
                            </li>
                        </ul>
                        <hr/>
                        <span>{kids}</span>
                        <ul>
                            <li>
                                <Link href="/categories/accessories/kids/all-products/products">
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
                    <div className={styles.img}>
                        <img
                            src="/images/unicorn/accessories.jpg"
                            width={400}
                            height={538}
                            className={styles.img}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
