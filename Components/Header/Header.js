import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import {useRouter} from "next/router";
import "../../node_modules/animate.css/animate.css";
import React, {useContext} from "react";

/*--------------------Components-------------------------*/
import MenuDrawer from "@/components/DrawerMenu";
import DialogShoppingBag from "@/components/DialogShoppingBag";
import DialogCompareProducts from "@/components/DialogCompareProducts/DialogCompareProducts";
import DialogSearchProducts from "@/components/DialogSearchProducts";
import PopOver from "@/components/PopOver";
import DropDownLnguageMenu from "./DropDownLangaugeMenu"
import DialogLogin from "./DialogLogin"
/*-------------------------X-----------------------------*/

/*--------------------Categories-------------------------*/
import {WomanCollections} from "@/components/Header/CategoriesHome/WomenCollections";
import {MenCollections} from "@/components/Header/CategoriesHome/MenCollections";
import {KidsCollections} from "@/components/Header/CategoriesHome/KidsCollections";
import {AccessoriesCollections} from "@/components/Header/CategoriesHome/AccessoriesCollections";
import {MoreCollections} from "@/components/Header/CategoriesHome/MoreCollections";
/*-------------------------X-----------------------------*/

/*--------------------Material Ui------------------------*/
import Badge from "@mui/material/Badge";
/*-------------------------X-----------------------------*/

/*----------------------Context--------------------------*/
import {AuthContext} from "@/context/AuthContext";
import {BagContext} from "@/context/BagContext";
import {CompareContext} from "@/context/CompareContext";
import {LanguageContext} from "@/context/LanguageContext";
/*-------------------------X-----------------------------*/

/*-----------------------Hooks---------------------------*/
import useScrollNavbar from "@/Hooks/useScrollNavbar";
import useDrawer from "@/Hooks/useDrawer";
/*-------------------------X-----------------------------*/

/*--------------------React Icons------------------------*/
import {HiOutlineShoppingBag} from "react-icons/hi";
import {RiAccountPinCircleLine} from "react-icons/ri";
import {FiMenu} from "react-icons/fi";
import {ImHeart} from "react-icons/im";
import {GiScales} from "react-icons/gi";
import {BsSearch} from "react-icons/bs"
/*-------------------------X----------------------------*/

export default function Header() {
    const router = useRouter();

    const {language} = useContext(LanguageContext)
    const {bag} = useContext(BagContext);
    const {productsCompare} = useContext(CompareContext);
    const {user} = useContext(AuthContext);


    const [drawerMenu, openDrawer, closeDrawer] = useDrawer(false);
    const [shoppingDialog, openShoppingDialog, closeShoppingDialog] = useDrawer(false);
    const [searchDialog, openSearchDialog, closeSearchDialog] = useDrawer(false);
    const [compareDialog, openCompareDialog, closeCompareDialog] = useDrawer(false);


    /*---state for handle language dropDown (open/close)---*/
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickLanguage = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseLanguage = () => {
        setAnchorEl(null);
    };

    /*----------State scroll down for Navbar----------*/
    const [scrollState] = useScrollNavbar("");

    return (
        <div className={styles.main}>
            <nav
                className={`${styles.containerNav} ${scrollState !== "top" &&
                styles.backgroundNavWhenScroll}`}
            >
                <div className={styles.logo}>
                    <Link href="/">
                        <img
                            src="/images/unicorn.png"
                            alt="unicorns-logo"
                            className={styles.logoImg}
                        />
                    </Link>
                    <Link href="/">
                        <img
                            src="/images/unicorn2.png"
                            alt="unicorns-logo"
                            className={styles.logoImg2}
                        />
                    </Link>
                </div>

                <div>
                    <ul data-aos="fade-out"
                        className={styles.containerLink}
                    >
                            <WomanCollections language={language}/>
                            <MenCollections language={language}/>
                            <KidsCollections language={language}/>
                            <AccessoriesCollections language={language}/>
                            <MoreCollections language={language}/>

                        {router.pathname === "/account/login" ||
                        router.pathname === "/account/checkout-login" ? null : (
                            <div className={styles.link}>
                                <DialogLogin />
                            </div>
                        )}
                    </ul>
                </div>

                <div className={styles.containerIcons}>
                    <PopOver
                        text="Search For Products"
                        icon={
                            <BsSearch
                                onClick={openSearchDialog}
                                className={styles.searchIcon}
                            />
                        }
                    />

                    <DropDownLnguageMenu
                        anchorEl={anchorEl}
                        open={open}
                        handleClickLanguage={handleClickLanguage}
                        handleCloseLanguage={handleCloseLanguage}
                    />

                    <Badge
                        badgeContent={bag.itemsCount}
                        color="error"
                        showZero
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        className={styles.badgCart}
                    >
                        <PopOver
                            text="Shopping Bag"
                            icon={
                                <HiOutlineShoppingBag
                                    onClick={openShoppingDialog}
                                    className={styles.bagIcon}
                                />
                            }
                        />
                    </Badge>
                    <Badge color="error"
                           variant="dot"
                           className={styles.badgWishBag}
                    >
                        <PopOver
                            text="Wish List"
                            icon={
                                <ImHeart
                                    onClick={
                                        user ? () => router.push("/products/wish-list") :
                                            () => router.push("/account/login")}
                                    className={styles.heartIcon}
                                />
                            }
                        />
                    </Badge>
                    <Badge
                        badgeContent={productsCompare.itemsCount}
                        color="error"
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        className={styles.badgCompareProducts}
                    >
                        <PopOver
                            text="Compare Products"
                            icon={
                                <GiScales
                                    onClick={openCompareDialog}
                                    className={styles.compareIcon}
                                />
                            }
                        />
                    </Badge>
                    <PopOver
                        text="My Account"
                        icon={
                            <RiAccountPinCircleLine
                                onClick={user ? () => router.push("/account/my-account") : () => router.push("/account/login")}
                                className={styles.accountIcon}
                            />
                        }
                    />
                    <FiMenu className={styles.menuIcon}
                            onClick={openDrawer}
                    />
                    <MenuDrawer closeDrawerMenu={closeDrawer}
                                drawerMenu={drawerMenu}
                    />
                    <DialogShoppingBag
                        shoppingDialog={shoppingDialog}
                        closeShoppingDialog={closeShoppingDialog}
                        user={user}
                    />
                    <DialogCompareProducts
                        compareDialog={compareDialog}
                        closeCompareDialog={closeCompareDialog}
                    />
                    <DialogSearchProducts
                        searchDialog={searchDialog}
                        closeSearchDialog={closeSearchDialog}
                    />
                </div>
            </nav>
        </div>
    );
}
