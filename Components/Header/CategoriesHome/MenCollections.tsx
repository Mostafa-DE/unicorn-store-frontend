import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import {IoIosArrowDown} from "react-icons/io";
import {languages} from "@/components/Header/TranslateText";
import Typography from "@mui/material/Typography";

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
                            <li style={{marginLeft: "1.5rem"}}>Coming Soon...<br/> Stay tuned 🦄</li>
                        {/*    <li>*/}
                        {/*        <Link href="/categories/men-fashions/men-pajamas/pajamas"*/}
                        {/*              className={styles.categoryLink}*/}
                        {/*        >*/}
                        {/*            {pajamas}*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <Link href="/categories/men-fashions/all-products/other-products"*/}
                        {/*              className={styles.categoryLink}*/}
                        {/*        >*/}
                        {/*            {allProducts}*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
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
