import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import "animate.css";
import Swal from "sweetalert2";
import React, { useContext, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

/*--------------------Components-------------------------*/
import MenuDrawer from "./MenuDrawer";
import DialogShoppingBag from "@/components/DialogShoppingBag";
import DialogCompareProducts from "./DialogCompareProducts";
/*-------------------------X-----------------------------*/

/*--------------------Categories-------------------------*/
import { WomanCollections } from "@/CategoriesHome/WomenCollections";
import { MenCollections } from "@/CategoriesHome/MenCollections";
import { KidsCollections } from "@/CategoriesHome/KidsCollections";
import { AccessoriesCollections } from "@/CategoriesHome/AccessoriesCollections";
import { MoreCollections } from "@/CategoriesHome/MoreCollections";
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
    error &&
      new Swal({
        title: error,
        icon: "error",
        confirmButtonColor: "#fb9aa7",
      });
  });

  /*---------------------X---------------------*/

  /*-----------------context Bag---------------*/
  const { bag } = useContext(BagContext);
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
  const [email, handleChangeEmail] = useInputField("");
  const [password, handleChangePassword] = useInputField("");
  const [showPassword, handleShowPassword] = useShowPassword(false);
  /*------------------------X-----------------------*/

  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    login({ email, password });
  };

  const DialogLogin = (
    <div>
      {!user && <li onClick={openLoginDialog}>تسجيل الدخول / اشتراك</li>}
      {user && <li onClick={logout}>تسجيل الخروج</li>}

      <Dialog
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
          <ul data-aos="fade-out" className={styles.containerLink}>
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
          <Badge color="error" variant="dot" className={styles.badgWishBag}>
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
        </div>
      </nav>
    </div>
  );
}
