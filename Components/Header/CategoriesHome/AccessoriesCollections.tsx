import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import {IoIosArrowDown} from "react-icons/io";
import {languages} from "../TranslateText"


export function AccessoriesCollections({language}) {
    const {
        titleAccessories,
        women,
        men,
        kids,
        necklaces,
        rings,
        bracelets,
        watches,
        allProducts,
    } = languages[language];

    return (
        <div className={styles.dropDown}>
            <li className={styles.linkProducts}>
                {titleAccessories}
                <IoIosArrowDown className={styles.icon}/>
            </li>
            <div className={styles.dropDownContent}>
                <div className={styles.containerDropDownContent}>
                    <div className={styles.collectionsDiv}>
                        <span>{women}</span>
                        <ul>
                            <li>
                                <Link href="/categories/accessories/women/women-necklace/necklace"
                                      className={styles.categoryLink}
                                >
                                    {necklaces}
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/accessories/women/women-rings/rings"
                                      className={styles.categoryLink}
                                >
                                    {rings}
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/accessories/women/women-bracelets/bracelets"
                                      className={styles.categoryLink}
                                >
                                    {bracelets}
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/accessories/women/all-products/other-products"
                                      className={styles.categoryLink}
                                >
                                    {allProducts}
                                </Link>
                            </li>
                        </ul>
                        <hr/>
                        <span>{men}</span>
                        <ul>
                            <li>
                                <Link href="/categories/accessories/men/men-watches/watches"
                                      className={styles.categoryLink}
                                >
                                    {watches}
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/accessories/men/all-products/other-products"
                                      className={styles.categoryLink}
                                >
                                    {allProducts}
                                </Link>
                            </li>
                        </ul>
                        <hr/>
                        <span>{kids}</span>
                        <ul>
                            <li>
                                <Link href="/categories/accessories/kids/all-products"
                                      className={styles.categoryLink}
                                >
                                    {allProducts}
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
