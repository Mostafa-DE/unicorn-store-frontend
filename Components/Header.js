import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import "animate.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useEffect, useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

/*--------------------Components-------------------------*/
import MenuDrawer from "./MenuDrawer";
import DialogShoppingBag from "@/components/DialogShoppingBag";
import DialogCompareProducts from "./DialogCompareProducts";
import Test from "@/components/Test";
/*-------------------------X-----------------------------*/

/*--------------------Material Ui------------------------*/
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Badge from "@mui/material/Badge";
/*-------------------------X-----------------------------*/

/*----------------------Context--------------------------*/
import { AuthContext } from "@/context/AuthContext";
import { BagContext } from "@/context/BagContext";
import { WishBagContext } from "@/context/WishBagContext";
import { CompareContext } from "@/context/CompareContext";
/*-------------------------X-----------------------------*/

/*-----------------------Hooks---------------------------*/
import useScrollNavbar from "@/Hooks/useScrollNavbar";
import useDrawer from "@/Hooks/useDrawer";
import useLoginDialog from "@/Hooks/useLoginDialog";
import useInputField from "@/Hooks/useInputField";
import useShowPassword from "@/Hooks/useShowPassword";
/*-------------------------X-----------------------------*/

/*--------------------React Icons------------------------*/
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { ImHeart } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { FiAlertCircle } from "react-icons/fi";
import { GiScales } from "react-icons/gi";
/*-------------------------X----------------------------*/

/*------------------------transition for Dialog--------------------*/
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
/*-----------------------------------X-----------------------------*/

export default function Header() {
  const router = useRouter();

  /*-----------context authenication-----------*/
  const { login, logout, user, error } = useContext(AuthContext);

  useEffect(() => {
    error && toast.error(error);
  });

  /*---------------------X---------------------*/

  /*-----------------context Bag---------------*/
  const { bag } = useContext(BagContext);
  /*---------------------X---------------------*/

  /*--------------context wish Bag-------------*/
  const { wishBag } = useContext(WishBagContext);
  /*---------------------X---------------------*/

  /*--------------context compare--------------*/
  const { productsCompare } = useContext(CompareContext);
  /*---------------------X---------------------*/

  /*---state for handle drawer menu (open/close)----*/
  const [drawerMenu, openDrawer, closeDrawer] = useDrawer(false);
  /*------------------------X-----------------------*/

  /*---state for handle shopping Bag (open/close)---*/
  const [shoppingDialog, openShoppingDialog, closeShoppingDialog] =
    useDrawer(false);
  /*------------------------X-----------------------*/

  /*--state for handle compare dialog (open/close)--*/
  const [compareDialog, openCompareDialog, closeCompareDialog] =
    useDrawer(false);
  /*------------------------X-----------------------*/

  /*----------State scroll down for Navbar----------*/
  const [scrollState] = useScrollNavbar("");
  /*------------------------X-----------------------*/

  /*---------------State Login Dialog---------------*/
  const [loginDialog, openLoginDialog, closeLoginDialog] =
    useLoginDialog(false);
  /*------------------------X-----------------------*/

  /*-------------State for Input Login--------------*/
  const [email, handleChangeEmail, resetEmail] = useInputField("");
  const [password, handleChangePassword, resetPassword] = useInputField("");
  const [showPassword, handleShowPassword] = useShowPassword(false);
  /*------------------------X-----------------------*/

  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    login({ email, password });
    resetPassword();
    resetEmail();
  };

  const DialogLogin = (
    <div>
      {!user && <li onClick={openLoginDialog}>تسجيل الدخول / اشتراك</li>}
      {user && <li onClick={logout}>تسجيل الخروج</li>}

      <Dialog
        animation={"false"}
        open={loginDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeLoginDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <ValidatorForm onSubmit={handleSubmit}>
          <p className={styles.titleDialog}>تسجيل الدخول</p>

          <DialogContent>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <div className={styles.containerInput}>
              <TextValidator
                type="email"
                onChange={handleChangeEmail}
                value={email}
                fullWidth
                variant="standard"
                label="البريد الإلكتروني"
                validators={["required"]}
                errorMessages={[" !! لا تستطيع ترك هذا الحقل فارغاً"]}
              />
              <div className={styles.containerPassword}>
                <TextValidator
                  type={showPassword === true ? "text" : "password"}
                  onChange={handleChangePassword}
                  value={password}
                  fullWidth
                  variant="standard"
                  label="الرقم السري"
                  validators={["required"]}
                  errorMessages={["!! لا تستطيع ترك هذا الحقل فارغاً"]}
                />
                {showPassword === true ? (
                  <RiEyeLine
                    className={styles.iconPassword}
                    onClick={handleShowPassword}
                  />
                ) : (
                  <RiEyeCloseLine
                    className={styles.iconPassword}
                    onClick={handleShowPassword}
                  />
                )}
              </div>
              <div className={`form-check mb-0 ${styles.checkBox} `}>
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  id="form2Example3"
                  checked
                  readOnly
                />
                <label className="form-check-label" htmlFor="form2Example3">
                  تذكرني
                  <FiAlertCircle className={styles.alertIcon} />
                </label>
              </div>
              <button type="submit" className={styles.signInBtn}>
                تسجيل الدخول
              </button>
              <Link href="/account/forgot-password">
                <a className={styles.forgotPassword}>
                  هل نسيت كلمة المرور الخاصة بك ؟؟
                </a>
              </Link>
              <p className={styles.noAccountText}>
                لا يوجد لديك حساب من قبل ؟؟
              </p>
              <Link href="/account/register">
                <button type="submit" className={styles.registerBtn}>
                  اشترك الآن
                </button>
              </Link>
            </div>
          </DialogContent>
        </ValidatorForm>
      </Dialog>
    </div>
  );

  /*-----------------All Collections----------------*/
  const WomanCollections = (
    <div className={styles.dropDown}>
      <li className={styles.linkProducts}>
        أقسام النساء <IoIosArrowDown />
      </li>
      <div className={styles.dropDownContent}>
        <div className={styles.containerDropDownContent}>
          <div className={styles.collectionsDiv}>
            <p>الأزياء النسائية</p>
            <span>منتجات صناعة تركية</span>
            <ul>
              <li>
                <Link href="/categories/women-fashions/turkey-dresses/dresses">
                  <a className={styles.categoryLink}>فساتين سهرة</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/women-fashions/turkey-lingeries/lingerie">
                  <a className={styles.categoryLink}>ﻻنجري</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/women-fashions/turkey-abayas/abaya">
                  <a className={styles.categoryLink}>عبايات و قطافين</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/women-fashions/turkey-all-products/other-products">
                  <a
                    className={`${styles.categoryLink} ${styles.collectionText}`}
                    style={{ padding: "1rem 0 2rem 0" }}
                  >
                    جميع المنتجات الأخرى
                  </a>
                </Link>
              </li>
            </ul>

            <span>منتجات صناعة محلية</span>
            <ul>
              <li>
                <Link href="/categories/women-fashions/local-dresses/dresses">
                  <a className={styles.categoryLink}>فساتين سهرة</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/women-fashions/local-lingeries/lingerie">
                  <a className={styles.categoryLink}>ﻻنجري</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/women-fashions/local-abayas/abaya">
                  <a className={styles.categoryLink}>عبايات و قطافين</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/women-fashions/local-all-products/other-products">
                  <a
                    className={styles.categoryLink}
                    style={{ padding: "1rem 0 2rem 0" }}
                  >
                    جميع المنتجات الأخرى
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <img
              src="/images/unicorn/women fashions.jpg"
              width={380}
              height={521}
              className={styles.img}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const MenCollections = (
    <div className={styles.dropDown}>
      <li className={styles.linkProducts}>
        أقسام الرجال <IoIosArrowDown />
      </li>
      <div className={styles.dropDownContent}>
        <div className={styles.containerDropDownContent}>
          <div className={styles.collectionsDiv}>
            <p>الأزياء الرجالية</p>
            <ul>
              <li>
                <Link href="/categories/men-fashions/men-pajamas/pajamas">
                  <a className={styles.categoryLink}>البيجامات</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/men-fashions/all-products/other-products">
                  <a className={styles.categoryLink}>جميع المنتجات الأخرى</a>
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
  );

  const KidsCollections = (
    <div className={styles.dropDown}>
      <li className={styles.linkProducts}>
        أقسام الأطفال <IoIosArrowDown />
      </li>
      <div className={styles.dropDownContent}>
        <div className={styles.containerDropDownContent}>
          <div className={styles.collectionsDiv}>
            <p>أزياء الأطفال</p>
            <span>منتجات صناعة تركية</span>
            <ul>
              <li>
                <Link href="/categories/kids-fashions/kids-pajamas/pajamas">
                  <a className={styles.categoryLink}>البيجامات</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/kids-fashions/kids-dresses/dresses">
                  <a className={styles.categoryLink}>فساتين</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/kids-fashions/all-products/other-products">
                  <a className={styles.categoryLink}>جميع المنتجات الأخرى</a>
                </Link>
              </li>
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
  );

  const AccessoriesCollections = (
    <div className={styles.dropDown}>
      <li className={styles.linkProducts}>
        قسم الإكسسوارات <IoIosArrowDown />
      </li>
      <div className={styles.dropDownContent}>
        <div className={styles.containerDropDownContent}>
          <div className={styles.collectionsDiv}>
            <p>أقسام الإكسسوارات</p>
            <span>نساء</span>
            <ul>
              <li>
                <Link href="/categories/accessories/women/women-necklace/necklace">
                  <a className={styles.categoryLink}>قلادات</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories/women/women-rings/rings">
                  <a className={styles.categoryLink}>خواتم</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories/women/women-bracelets/bracelets">
                  <a className={styles.categoryLink}>أساور </a>
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories/women/all-products/other-products">
                  <a className={styles.categoryLink}>جميع المنتجات الأخرى</a>
                </Link>
              </li>
            </ul>
            <span>رجال</span>
            <ul>
              <li>
                <Link href="/categories/accessories/men/men-watches/watches">
                  <a className={styles.categoryLink}>ساعات</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories/men/all-products/other-products">
                  <a className={styles.categoryLink}>جميع المنتجات الأخرى</a>
                </Link>
              </li>
            </ul>
            <span>الأطفال</span>
            <ul>
              <li>
                <Link href="/categories/accessories/kids/all-products/products">
                  <a
                    className={styles.categoryLink}
                    style={{ padding: "1rem 0 2rem 0" }}
                  >
                    جميع المنتجات
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.img}>
            <img
              src="/images/unicorn/accessories.jpg"
              width={400}
              className={styles.img}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const MoreCollections = (
    <div className={styles.dropDown}>
      <li className={styles.linkProducts}>
        الأقسام الأخرى <IoIosArrowDown />
      </li>
      <div className={styles.dropDownContent}>
        <div className={styles.containerDropDownContent}>
          <div className={styles.collectionsDiv}>
            <p>جميع الأقسام</p>
            <span>تجميل</span>
            <ul>
              <li>
                <Link href="/categories/makeup/products">
                  <a className={styles.categoryLink}>جميع المنتجات</a>
                </Link>
              </li>
            </ul>

            <span>الباكيجات</span>
            <ul>
              <li>
                <Link href="/categories/packages/products">
                  <a className={styles.categoryLink}>جميع المنتجات</a>
                </Link>
              </li>
            </ul>

            <span>الأدوات المنزلية</span>
            <ul>
              <li>
                <Link href="/categories/houseware/products">
                  <a className={styles.categoryLink}>جميع المنتجات</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.img}>
            <img
              src="/images/test/test1.jpg"
              width={400}
              className={styles.img}
            />
          </div>
        </div>
      </div>
    </div>
  );
  /*------------------------X-----------------------*/

  return (
    <div className={styles.main}>
      <nav
        className={`${styles.containerNav} ${
          scrollState !== "top" && styles.backgroundNavWhenScroll
        }`}
      >
        <div className={styles.logo}>
          <Link href="/">
            <img src="/images/unicorn.png" className={styles.logoImg} />
          </Link>
          <Link href="/">
            <img src="/images/unicorn2.png" className={styles.logoImg2} />
          </Link>
        </div>

        <div>
          <ul className={styles.containerLink}>
            <div>{WomanCollections}</div>

            <div>{MenCollections}</div>

            <div>{KidsCollections}</div>

            <div>{AccessoriesCollections}</div>

            <div>{MoreCollections}</div>

            <div className={styles.link}>{DialogLogin}</div>
          </ul>
        </div>

        <div className={styles.containerIcons}>
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
            <HiOutlineShoppingBag
              onClick={openShoppingDialog}
              className={styles.bagIcon}
            />
          </Badge>
          <Badge
            badgeContent={wishBag.itemsCount}
            color="error"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            className={styles.badgWishBag}
          >
            {user !== null ? (
              <ImHeart
                onClick={() => router.push("/products/wish-list")}
                className={styles.heartIcon}
              />
            ) : (
              <ImHeart
                onClick={() => router.push("/account/login")}
                className={styles.heartIcon}
              />
            )}
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
            <GiScales
              onClick={openCompareDialog}
              className={styles.compareIcon}
            />
          </Badge>
          {user ? (
            <RiAccountPinCircleLine
              onClick={() => router.push("/account/my-account")}
              className={styles.searchIcon}
            />
          ) : (
            <RiAccountPinCircleLine
              onClick={() => router.push("/account/login")}
              className={styles.searchIcon}
            />
          )}
          <FiMenu className={styles.menuIcon} onClick={openDrawer} />
          {/* <MenuDrawer closeDrawerMenu={closeDrawer} drawerMenu={drawerMenu} /> */}
          <Test closeDrawerMenu={closeDrawer} drawerMenu={drawerMenu} />
          <DialogShoppingBag
            shoppingDialog={shoppingDialog}
            closeShoppingDialog={closeShoppingDialog}
            user={user}
          />
          <DialogCompareProducts
            compareDialog={compareDialog}
            closeCompareDialog={closeCompareDialog}
          />
        </div>
      </nav>
    </div>
  );
}
