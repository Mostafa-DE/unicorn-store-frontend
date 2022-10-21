import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import {IoIosArrowDown} from "react-icons/io";
import {languages} from "@/components/Header/TranslateText";

export function MoreCollections({language}) {
    const {titleOther, allProducts, makeup, packages, houseware} = languages[language];
    return (
        <div className={styles.dropDown}>
            <li className={styles.linkProducts}>
                {titleOther}
                <IoIosArrowDown className={styles.icon}/>
            </li>
            <div className={styles.dropDownContent}>
                <div className={styles.containerDropDownContent}>
                    <div className={styles.collectionsDiv}>
                        <span>{makeup}</span>
                        <ul>
                            <li>
                                <Link href="/categories/makeup/products">
                                    <a className={styles.categoryLink}>{allProducts}</a>
                                </Link>
                            </li>
                        </ul>

                        <hr />
                        <span>{packages}</span>
                        <ul>
                            <li>
                                <Link href="/categories/packages/products">
                                    <a className={styles.categoryLink}>{allProducts}</a>
                                </Link>
                            </li>
                        </ul>

                        <hr />
                        <span>{houseware}</span>
                        <ul>
                            <li>
                                <Link href="/categories/houseware/products">
                                    <a className={styles.categoryLink}>{allProducts}</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.img}>
                        <img src="/images/unicorn2.png"
                             width={350}
                             style={{margin: "0 2rem 0 0"}}
                             className={styles.img}
                             alt="unicorns-logo"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
