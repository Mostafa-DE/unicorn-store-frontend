import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import {IoIosArrowDown} from "react-icons/io";
import {languages} from "@/components/Header/TranslateText";

export function KidsCollections({language}) {
    const {titleKids, allProducts, pajamas, dresses, TurkishMade} = languages[language];
    return (
        <div className={styles.dropDown}>
            <li className={styles.linkProducts}>
                {titleKids}<IoIosArrowDown className={styles.icon}/>
            </li>
            <div className={styles.dropDownContent}>
                <div className={styles.containerDropDownContent}>
                    <div className={styles.collectionsDiv}>
                        {/*<span>{TurkishMade}</span>*/}
                        <ul>
                            <li style={{marginLeft: "1.5rem"}}>Coming Soon...<br/> Stay tuned 🦄</li>
                            {/*<li>*/}
                            {/*    <Link*/}
                            {/*        href="/categories/kids-fashions/kids-pajamas/pajamas"*/}
                            {/*        className={styles.categoryLink}*/}
                            {/*    >*/}
                            {/*        {pajamas}*/}
                            {/*    </Link>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <Link href="/categories/kids-fashions/kids-dresses/dresses"*/}
                            {/*          className={styles.categoryLink}*/}
                            {/*    >*/}
                            {/*        {dresses}*/}
                            {/*    </Link>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <Link href="/categories/kids-fashions/all-products/other-products"*/}
                            {/*          className={styles.categoryLink}*/}
                            {/*    >*/}
                            {/*        {allProducts}*/}
                            {/*    </Link>*/}
                            {/*</li>*/}
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
