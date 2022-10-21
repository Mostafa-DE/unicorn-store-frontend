import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import "../../node_modules/animate.css/animate.css";
import { useContext, useState } from "react";
import MenuDrawer from "@/components/DrawerMenu";
import DialogShoppingBag from "@/components/DialogShoppingBag";
import DialogCompareProducts from "@/components/DialogCompareProducts/DialogCompareProducts";
import DialogSearchProducts from "@/components/DialogSearchProducts";
import PopOver from "@/components/PopOver";
import DropDownLnguageMenu from "./DropDownLangaugeMenu";
import DialogLogin from "./DialogLogin";
import { WomanCollections } from "@/components/Header/CategoriesHome/WomenCollections";
import { MenCollections } from "@/components/Header/CategoriesHome/MenCollections";
import { KidsCollections } from "@/components/Header/CategoriesHome/KidsCollections";
import { AccessoriesCollections } from "@/components/Header/CategoriesHome/AccessoriesCollections";
import { MoreCollections } from "@/components/Header/CategoriesHome/MoreCollections";
import DropDownAccount from "@/components/DropDownAccount";
import Badge from "@mui/material/Badge";
import { AuthContext } from "@/context/AuthContext";
import { BagContext } from "@/context/BagContext";
import { CompareContext } from "@/context/CompareContext";
import { LanguageContext } from "@/context/LanguageContext";
import useScrollNavbar from "@/Hooks/useScrollNavbar";
import useToggle from "@/Hooks/useToggle";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { ImHeart } from "react-icons/im";
import { GiScales } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";

export default function Header() {
  const router = useRouter();

  //TODO: add right types here
  // @ts-ignore
  const { language } = useContext(LanguageContext);
  //TODO: add right types here
  // @ts-ignore
  const { bag } = useContext(BagContext);
  //TODO: add right types here
  // @ts-ignore
  const { productsCompare } = useContext(CompareContext);
  //TODO: add right types here
  // @ts-ignore
  const { user } = useContext(AuthContext);

  const [drawerMenu, openDrawer, closeDrawer] = useToggle();
  const [shoppingDialog, openShoppingDialog, closeShoppingDialog] = useToggle();
  const [searchDialog, openSearchDialog, closeSearchDialog] = useToggle();
  const [compareDialog, openCompareDialog, closeCompareDialog] = useToggle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrollState] = useScrollNavbar();

  const open = Boolean(anchorEl);

  const handleClickLanguage = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLanguage = () => {
    setAnchorEl(null);
  };

  const hideLoginLink = () => {
    const paths = [
      "/account/login",
      "/account/register",
      "/account/checkout-login",
    ];
    return !paths.includes(router.pathname);
  };

  return (
    <div className={styles.main}>
      <nav
        className={`${styles.containerNav} ${
          scrollState !== "top" && styles.backgroundNavWhenScroll
        }`}
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
          <ul data-aos="fade-out" className={styles.containerLink}>
            <WomanCollections language={language} />
            <MenCollections language={language} />
            <KidsCollections language={language} />
            <AccessoriesCollections language={language} />
            <MoreCollections language={language} />

            {hideLoginLink() && (
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
                //TODO: add right types here
                // @ts-ignore
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
              horizontal: "right",
            }}
            className={styles.badgCart}
          >
            <PopOver
              text="Shopping Bag"
              icon={
                <HiOutlineShoppingBag
                  //TODO: add right types here
                  // @ts-ignore
                  onClick={openShoppingDialog}
                  className={styles.bagIcon}
                />
              }
            />
          </Badge>
          <Badge color="error" variant="dot" className={styles.badgWishBag}>
            <PopOver
              text="Wish List"
              icon={
                <ImHeart
                  onClick={() => router.push("/products/wish-list")}
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
              horizontal: "right",
            }}
            className={styles.badgCompareProducts}
          >
            <PopOver
              text="Compare Products"
              icon={
                <GiScales
                  //TODO: add right types here
                  // @ts-ignore
                  onClick={openCompareDialog}
                  className={styles.compareIcon}
                />
              }
            />
          </Badge>
          <DropDownAccount />
          <FiMenu
            className={styles.menuIcon}
            //TODO: add right types here
            // @ts-ignore
            onClick={openDrawer}
          />
          <MenuDrawer closeDrawerMenu={closeDrawer} drawerMenu={drawerMenu} />
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
