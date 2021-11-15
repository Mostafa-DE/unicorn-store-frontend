import styles from "@/styles/MenuDrawer.module.css";
import Link from "next/link";
import { useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import useOpenCategoryMenu from "@/Hooks/useOpenCategoryMenu";
import { BsPlus } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import { FaFacebookF } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

export default function Example({ drawerMenu, closeDrawerMenu }) {
  const router = useRouter();
  const { logout, user } = useContext(AuthContext);
  const [openCategoriesWomen, handleOpenCategoriesWomen] = useOpenCategoryMenu(
    false
  );
  const [
    openWomenTurkeyProducts,
    handleOpenWomenTurkeyProducts
  ] = useOpenCategoryMenu(false);
  const [
    openWomenLocalProducts,
    handleOpenWomenLocalProducts
  ] = useOpenCategoryMenu(false);
  const [openMenProducts, handleOpenMenProducts] = useOpenCategoryMenu(false);
  const [openKidsProducts, handleOpenKidsProducts] = useOpenCategoryMenu(false);
  const [
    openCategoriesAccessories,
    handleOpenCategoriesAccessories
  ] = useOpenCategoryMenu(false);
  const [
    openWomenAccessories,
    handleOpenWomenAccessories
  ] = useOpenCategoryMenu(false);
  const [openMenAccessories, handleOpenMenAccessories] = useOpenCategoryMenu(
    false
  );
  const [openKidsAccessories, handleOpenKidsAccessories] = useOpenCategoryMenu(
    false
  );
  const [openOtherCategories, handleOpenOtherCategories] = useOpenCategoryMenu(
    false
  );

  const WomenTurkeyProducts = (
    <List component="div" disablePadding>
      <ListItem button onClick={handleOpenWomenTurkeyProducts}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
        >
          <span> المنتجات التركية </span>
          {openWomenTurkeyProducts ? <AiOutlineMinus /> : <BsPlus />}
        </div>
      </ListItem>
      <Collapse in={openWomenTurkeyProducts} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/categories/women-fashions/turkey-dresses/dresses">
            <ListItem button>
              <ListItemIcon>
                <span>فساتين سهرة</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/women-fashions/turkey-lingeries/lingerie">
            <ListItem button>
              <ListItemIcon>
                <span>ﻻنجري</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/women-fashions/turkey-abayas/abaya">
            <ListItem button>
              <ListItemIcon>
                <span>عبايات و قطافين</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/women-fashions/turkey-all-products/other-products">
            <ListItem button>
              <ListItemIcon>
                <span>جميع المنتجات</span>
              </ListItemIcon>
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </List>
  );

  const WomenLocalProducts = (
    <List component="div" disablePadding>
      <ListItem button onClick={handleOpenWomenLocalProducts}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
        >
          <span> المنتجات المحلية </span>
          {openWomenLocalProducts ? <AiOutlineMinus /> : <BsPlus />}
        </div>
      </ListItem>
      <Collapse in={openWomenLocalProducts} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/categories/women-fashions/local-dresses/dresses">
            <ListItem button>
              <ListItemIcon>
                <span>فساتين سهرة</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/women-fashions/local-lingeries/lingerie">
            <ListItem button>
              <ListItemIcon>
                <span>ﻻنجري</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/women-fashions/local-abayas/abaya">
            <ListItem button>
              <ListItemIcon>
                <span>عبايات و قطافين</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/women-fashions/local-all-products/other-products">
            <ListItem button>
              <ListItemIcon>
                <span>جميع المنتجات</span>
              </ListItemIcon>
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </List>
  );

  const WomenAccessories = (
    <List component="div" disablePadding>
      <ListItem button onClick={handleOpenWomenAccessories}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
        >
          <span> قسم النساء </span>
          {openWomenAccessories ? <AiOutlineMinus /> : <BsPlus />}
        </div>
      </ListItem>
      <Collapse in={openWomenAccessories} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/categories/accessories/women/women-necklace/necklace">
            <ListItem button>
              <ListItemIcon>
                <span>قلادات</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/accessories/women/women-rings/rings">
            <ListItem button>
              <ListItemIcon>
                <span>خواتم</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/accessories/women/women-bracelets/bracelets">
            <ListItem button>
              <ListItemIcon>
                <span>أساور</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/accessories/women/all-products/other-products">
            <ListItem button>
              <ListItemIcon>
                <span>جميع المنتجات</span>
              </ListItemIcon>
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </List>
  );

  const MenAccessories = (
    <List component="div" disablePadding>
      <ListItem button onClick={handleOpenMenAccessories}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
        >
          <span> قسم الرجال </span>
          {openMenAccessories ? <AiOutlineMinus /> : <BsPlus />}
        </div>
      </ListItem>
      <Collapse in={openMenAccessories} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/categories/accessories/men/men-watches/watches">
            <ListItem button>
              <ListItemIcon>
                <span>ساعات</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/accessories/men/all-products/other-products">
            <ListItem button>
              <ListItemIcon>
                <span>جميع المنتجات</span>
              </ListItemIcon>
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </List>
  );

  const kidsAccessories = (
    <List component="div" disablePadding>
      <ListItem button onClick={handleOpenKidsAccessories}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
        >
          <span> قسم الأطفال </span>
          {openKidsAccessories ? <AiOutlineMinus /> : <BsPlus />}
        </div>
      </ListItem>
      <Collapse in={openKidsAccessories} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/categories/accessories/kids/all-products/products">
            <ListItem button>
              <ListItemIcon>
                <span>جميع المنتجات</span>
              </ListItemIcon>
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </List>
  );

  return (
    <>
      <Offcanvas placement={"end"} show={drawerMenu} onHide={closeDrawerMenu}>
        <Offcanvas.Header closeButton>
          <img src="/images/unicorn.png" width={100} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/*--------------------Women Categories---------------------*/}
          <List>
            <ListItem button onClick={handleOpenCategoriesWomen}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <span> قسم النساء</span>
                {openCategoriesWomen ? <AiOutlineMinus /> : <BsPlus />}
              </div>
            </ListItem>
            <Collapse in={openCategoriesWomen} timeout="auto" unmountOnExit>
              {WomenTurkeyProducts}
              {WomenLocalProducts}
            </Collapse>
          </List>
          {/*---------------------------X------------------------------*/}

          {/*--------------------Men Categories---------------------*/}
          <List>
            <ListItem button onClick={handleOpenMenProducts}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <span> قسم الرجال</span>
                {openMenProducts ? <AiOutlineMinus /> : <BsPlus />}
              </div>
            </ListItem>
            <Collapse in={openMenProducts} timeout="auto" unmountOnExit>
              <Link href="/categories/men-fashions/men-pajamas/pajamas">
                <ListItem button>
                  <ListItemIcon>
                    <span>البيجامات</span>
                  </ListItemIcon>
                </ListItem>
              </Link>

              <Link href="/categories/men-fashions/all-products/other-products">
                <ListItem button>
                  <ListItemIcon>
                    <span>جميع المنتجات</span>
                  </ListItemIcon>
                </ListItem>
              </Link>
            </Collapse>
          </List>
          {/*---------------------------X------------------------------*/}

          {/*--------------------Kids Categories---------------------*/}
          <List>
            <ListItem button onClick={handleOpenKidsProducts}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <span> قسم الأطفال</span>
                {openKidsProducts ? <AiOutlineMinus /> : <BsPlus />}
              </div>
            </ListItem>
            <Collapse in={openKidsProducts} timeout="auto" unmountOnExit>
              <Link href="/categories/kids-fashions/kids-pajamas/pajamas">
                <ListItem button>
                  <ListItemIcon>
                    <span>البيجامات</span>
                  </ListItemIcon>
                </ListItem>
              </Link>

              <Link href="/categories/kids-fashions/kids-dresses/dresses">
                <ListItem button>
                  <ListItemIcon>
                    <span>فساتين</span>
                  </ListItemIcon>
                </ListItem>
              </Link>

              <Link href="/categories/kids-fashions/all-products/other-products">
                <ListItem button>
                  <ListItemIcon>
                    <span>جميع المنتجات</span>
                  </ListItemIcon>
                </ListItem>
              </Link>
            </Collapse>
          </List>
          {/*---------------------------X------------------------------*/}

          {/*--------------------Accessories Categories---------------------*/}
          <List>
            <ListItem button onClick={handleOpenCategoriesAccessories}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <span> قسم الإكسسوارات</span>
                {openCategoriesAccessories ? <AiOutlineMinus /> : <BsPlus />}
              </div>
            </ListItem>
            <Collapse
              in={openCategoriesAccessories}
              timeout="auto"
              unmountOnExit
            >
              {WomenAccessories}
              {MenAccessories}
              {kidsAccessories}
            </Collapse>
          </List>
          {/*---------------------------X------------------------------*/}

          {/*--------------------Other Categories---------------------*/}
          <List>
            <ListItem button onClick={handleOpenOtherCategories}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <span> الأقسام الأخرى</span>
                {openOtherCategories ? <AiOutlineMinus /> : <BsPlus />}
              </div>
            </ListItem>
            <Collapse in={openOtherCategories} timeout="auto" unmountOnExit>
              <Link href="/categories/makeup/products">
                <ListItem button>
                  <ListItemIcon>
                    <span>قسم التجميل</span>
                  </ListItemIcon>
                </ListItem>
              </Link>

              <Link href="/categories/packages/products">
                <ListItem button>
                  <ListItemIcon>
                    <span>قسم الباكيجات</span>
                  </ListItemIcon>
                </ListItem>
              </Link>

              <Link href="/categories/houseware/products">
                <ListItem button>
                  <ListItemIcon>
                    <span>قسم الأدوات المنزلية</span>
                  </ListItemIcon>
                </ListItem>
              </Link>
            </Collapse>
          </List>

          <div className={styles.containerLogin}>
            <div className={styles.containerAllText}>
              {!user && (
                <p
                  onClick={() => router.push("/account/login")}
                  className={styles.loginText}
                >
                  تسجيل الدخول / إشتراك
                </p>
              )}
              {user && (
                <p onClick={logout} className={styles.loginText}>
                  تسجيل الخروج
                </p>
              )}
              <p
                onClick={
                  user
                    ? () => router.push("/products/wish-list")
                    : () => router.push("/account/login")
                }
                className={styles.wishListText}
              >
                قائمة المفضلة
              </p>
              <p className={styles.currencyText}>العملة | الدينار الأردني</p>
            </div>

            <div className={styles.containerSocial}>
              <p className={styles.followUsText}>تابعنا عبر</p>
              <div className={styles.containerSocialIcon}>
                <a
                  href="https://web.facebook.com/JoUnicornsStore"
                  type="button"
                  className={styles.social}
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/unicornsstore_jo/"
                  type="button"
                  className={styles.social}
                >
                  <SiInstagram />
                </a>
                <a
                  href="https://twitter.com/login"
                  type="button"
                  className={styles.social}
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
          {/*---------------------------X------------------------------*/}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
