import styles from "@/components/CategoriesPhoto/CategoriesPhoto.module.css";
import Link from "next/link";
import {AiOutlineLine} from "react-icons/ai";
import {womenCollections, kidsCollections, menCollections, accessoriesCollections} from "./constants"
import {languages} from "./TranslateText"
import {useContext} from "react";
import {LanguageContext} from "@/context/LanguageContext";
import Box from "@mui/material/Box";

export default function CategoriesPhoto() {
    // @ts-ignore
    const {language} = useContext(LanguageContext)
    const {
        womenMainTitle,
        womenLinksTitle,
        menMainTitle,
        menLinksTitle,
        kidsMainTitle,
        kidsLinksTitle,
        accessoriesMainTitle,
        accessoriesLinksTitle,
        makeUpTitle,
        housewaresTitle,
        btnText,
    } = languages[language];

    return (
        <div data-aos="fade-in"
             data-aos-once='true'
             className={styles.main}
        >
            <div className={styles.container}>

                <div className={styles.containerWomenCard}>
                    <div className={styles.womenCardContent}>
                        <p className={styles.womenFashionText}>{womenMainTitle}</p>
                        <button className={styles.WomenShopBtn}>{btnText}</button>
                        <div className={styles.overlay}>
                            <div className={styles.containerCategories}>
                                <div className={styles.allCategories}>
                                    <ul className={styles.WomenUl}>
                                        {womenCollections(womenLinksTitle).map((collection, idx) => (
                                            <Box key={idx}>
                                                {collection.type === "turkey" && (
                                                    <div className={styles.containerTitle}>
                                                        <p className={styles.titleCategories}>{collection.title}</p>
                                                        <AiOutlineLine className={styles.lineIcon}/>
                                                    </div>
                                                )}
                                                {collection.type === "turkey" &&
                                                    collection.links.map((link, idx) => (
                                                        <Link
                                                            key={idx}
                                                            href={link.url}
                                                            passHref
                                                        >
                                                            <li>{link.title}</li>
                                                        </Link>
                                                    ))}
                                            </Box>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.allCategories}>
                                    <ul className={styles.WomenUl}>
                                        {womenCollections(womenLinksTitle).map((collection, idx) => (
                                            <Box key={idx}>
                                                {collection.type === "local" && (
                                                    <div className={styles.containerTitle}>
                                                        <p className={styles.titleCategories}>{collection.title}</p>
                                                        <AiOutlineLine className={styles.lineIcon}/>
                                                    </div>
                                                )}
                                                {collection.type === "local" &&
                                                    collection.links.map((link, idx) => (
                                                        <Link
                                                            key={idx}
                                                            href={link.url}
                                                        >
                                                            <li>{link.title}</li>
                                                        </Link>
                                                    ))}
                                            </Box>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.containerKidsCard}>
                    <div className={styles.kidsCardContent}>
                        <p className={styles.kidsFashionText}>{kidsMainTitle}</p>
                        <button className={styles.kidsShopBtn}>{btnText}</button>
                        <div className={styles.overlay}>
                            <div className={styles.containerCategories}>
                                <div className={styles.allCategories}>
                                    <ul>
                                        <li style={{fontSize: "1.5rem", marginTop: "2rem"}}>
                                            Coming Soon...<br/> Stay tuned 🦄
                                        </li>
                                        {/*<div className={styles.containerTitle}>*/}
                                        {/*    <p className={styles.titleCategories}> {kidsCollections(kidsLinksTitle).title} </p>*/}
                                        {/*    <AiOutlineLine className={styles.lineIcon}/>*/}
                                        {/*</div>*/}
                                        {/*{kidsCollections(kidsLinksTitle).links.map((collection, idx) => (*/}
                                        {/*    <Link*/}
                                        {/*        key={idx}*/}
                                        {/*        href={collection.url}*/}
                                        {/*        passHref*/}
                                        {/*    >*/}
                                        {/*        <li>{collection.title}</li>*/}
                                        {/*    </Link>*/}
                                        {/*))}*/}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.containerMenCard}>
                    <div className={styles.menCardContent}>
                        <p className={styles.menFashionText}>{menMainTitle}</p>
                        <button className={styles.menShopBtn}>{btnText}</button>
                        <div className={styles.overlay}>
                            <div className={styles.containerCategories}>
                                <div className={styles.allCategories}>
                                    <ul>
                                        <li style={{fontSize: "1.5rem", marginTop: "2rem"}}>
                                            Coming Soon...<br/> Stay tuned 🦄
                                        </li>
                                        {/*<div className={styles.containerTitle}>*/}
                                        {/*    <p className={styles.titleCategories}> {menCollections(menLinksTitle).title} </p>*/}
                                        {/*    <AiOutlineLine className={styles.lineIcon}/>*/}
                                        {/*</div>*/}
                                        {/*{menCollections(menLinksTitle).links.map((collection, idx) => (*/}
                                        {/*    <Link*/}
                                        {/*        key={idx}*/}
                                        {/*        href={collection.url}*/}
                                        {/*        passHref*/}
                                        {/*    >*/}
                                        {/*        <li>{collection.title}</li>*/}
                                        {/*    </Link>*/}
                                        {/*))}*/}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.containerAccessories}>
                    <div className={styles.accessoriesCardContent}>
                        <p className={styles.accessoriesText}> {accessoriesMainTitle} </p>
                        <button className={styles.accessoriesShopBtn}>{btnText}</button>
                        <div className={styles.overlay}>
                            <div className={styles.containerCategoriesAccessories}>
                                <div className={styles.allCategories}>
                                    <ul>
                                        <li style={{fontSize: "1.5rem", margin: "2rem 0 0 6rem"}}>
                                            Coming Soon...<br/> Stay tuned 🦄
                                        </li>
                                        {/*{accessoriesCollections(accessoriesLinksTitle).map((collection, idx) => (*/}
                                        {/*    <Box key={idx}>*/}
                                        {/*        {collection.type === "women" && (*/}
                                        {/*            <div className={styles.containerTitle}>*/}
                                        {/*                <p className={styles.titleCategories}>{collection.title}</p>*/}
                                        {/*                <AiOutlineLine className={styles.lineIcon}/>*/}
                                        {/*            </div>*/}
                                        {/*        )}*/}
                                        {/*        {collection.type === "women" &&*/}
                                        {/*            collection.links.map((link, idx) => (*/}
                                        {/*                <Link*/}
                                        {/*                    key={idx}*/}
                                        {/*                    href={link.url}*/}
                                        {/*                    passHref*/}
                                        {/*                >*/}
                                        {/*                    <li>{link.title}</li>*/}
                                        {/*                </Link>*/}
                                        {/*            ))}*/}
                                        {/*    </Box>*/}
                                        {/*))}*/}
                                    </ul>
                                </div>
                                {/*// <div className={styles.allCategories}>*/}
                                {/*//     <ul>*/}
                                {/*//         {accessoriesCollections(accessoriesLinksTitle).map((collection, idx) => (*/}
                                {/*//             <Box key={idx}>*/}
                                {/*//                 {collection.type === "men" && (*/}
                                {/*//                     <div className={styles.containerTitle}>*/}
                                {/*//                         <p className={styles.titleCategories}>{collection.title}</p>*/}
                                {/*//                         <AiOutlineLine className={styles.lineIcon}/>*/}
                                {/*//                     </div>*/}
                                {/*//                 )}*/}
                                {/*/!*                {collection.type === "men" &&*!/*/}
                                {/*/!*                    collection.links.map((link, idx) => (*!/*/}
                                {/*/!*                        <Link*!/*/}
                                {/*/!*                            key={idx}*!/*/}
                                {/*/!*                            href={link.url}*!/*/}
                                {/*/!*                            passHref*!/*/}
                                {/*/!*                        >*!/*/}
                                {/*/!*                            <li>{link.title}</li>*!/*/}
                                {/*/!*                        </Link>*!/*/}
                                {/*/!*                    ))}*!/*/}
                                {/*/!*            </Box>*!/*/}
                                {/*/!*        ))}*!/*/}
                                {/*/!*    </ul>*!/*/}
                                {/*/!*</div>*!/*/}
                                {/*// <div className={styles.allCategories}>*/}
                                {/*    <ul>*/}
                                {/*        {accessoriesCollections(accessoriesLinksTitle).map((collection, idx) => (*/}
                                {/*            <Box key={idx}>*/}
                                {/*                {collection.type === "kids" && (*/}
                                {/*                    <div className={styles.containerTitle}>*/}
                                {/*                        <p className={styles.titleCategories}>{collection.title}</p>*/}
                                {/*                        <AiOutlineLine className={styles.lineIcon}/>*/}
                                {/*                    </div>*/}
                                {/*                )}*/}
                                {/*                {collection.type === "kids" &&*/}
                                {/*                    collection.links.map((link, idx) => (*/}
                                {/*                        <Link*/}
                                {/*                            key={idx}*/}
                                {/*                            href={link.url}*/}
                                {/*                            passHref*/}
                                {/*                        >*/}
                                {/*                            <li>{link.title}</li>*/}
                                {/*                        </Link>*/}
                                {/*                    ))}*/}
                                {/*            </Box>*/}
                                {/*        ))}*/}
                                {/*    </ul>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.containerMakeup}>
                    <div className={styles.makeupCardContent}>
                        <p className={styles.makeupText}> {makeUpTitle} </p>
                        <Link href="#" passHref>
                            <button style={{
                                margin: "2rem 13rem 0 0",
                                backgroundColor: "transparent",
                                border: "1px solid #333",
                                padding: "0.5rem 1.2rem",
                            }}>
                                Coming Soon 🦄
                            </button>
                            {/*<button className={styles.makeupShopBtn}>{btnText}</button>*/}
                        </Link>
                    </div>
                </div>

                <div className={styles.containerHouseware}>
                    <div className={styles.housewareCardContent}>
                        <p className={styles.housewareText}> {housewaresTitle} </p>
                        <Link href="#" passHref>
                            <button style={{
                                backgroundColor: "transparent",
                                border: "1px solid #333",
                                padding: "0.5rem 1.2rem",
                            }}>
                                Coming Soon 🦄
                            </button>
                            {/*<button className={styles.housewareShopBtn}>{btnText}</button>*/}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
