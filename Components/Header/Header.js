import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import {useRouter} from "next/router";
import "../../node_modules/animate.css/animate.css";
import React, {useContext, useEffect, useState} from "react";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import Alert from "react-bootstrap/Alert";

/*--------------------Components-------------------------*/
import MenuDrawer from "../DrawerMenu/MenuDrawer";
import DialogShoppingBag from "@/components/DialogShoppingBag/DialogShoppingBag";
import DialogCompareProducts from "../DialogCompareProducts/DialogCompareProducts";
/*-------------------------X-----------------------------*/

/*--------------------Categories-------------------------*/
import {WomanCollections} from "@/components/Header/CategoriesHome/WomenCollections";
import {MenCollections} from "@/components/Header/CategoriesHome/MenCollections";
import {KidsCollections} from "@/components/Header/CategoriesHome/KidsCollections";
import {AccessoriesCollections} from "@/components/Header/CategoriesHome/AccessoriesCollections";
import {MoreCollections} from "@/components/Header/CategoriesHome/MoreCollections";
/*-------------------------X-----------------------------*/

/*--------------------Material Ui------------------------*/
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Badge from "@mui/material/Badge";
/*-------------------------X-----------------------------*/

/*----------------------Context--------------------------*/
import {AuthContext} from "@/context/AuthContext";
import {BagContext} from "@/context/BagContext";
import {CompareContext} from "@/context/CompareContext";
/*-------------------------X-----------------------------*/

/*-----------------------Hooks---------------------------*/
import useScrollNavbar from "@/Hooks/useScrollNavbar";
import useDrawer from "@/Hooks/useDrawer";
import useLoginDialog from "@/Hooks/useLoginDialog";
import useInputField from "@/Hooks/useInputField";
import useShowPassword from "@/Hooks/useShowPassword";
/*-------------------------X-----------------------------*/

/*--------------------React Icons------------------------*/
import {HiOutlineShoppingBag} from "react-icons/hi";
import {RiAccountPinCircleLine} from "react-icons/ri";
import {FiMenu} from "react-icons/fi";
import {ImHeart} from "react-icons/im";
import {RiEyeLine} from "react-icons/ri";
import {RiEyeCloseLine} from "react-icons/ri";
import {FiAlertCircle} from "react-icons/fi";
import {GiScales} from "react-icons/gi";
import {MdLanguage} from "react-icons/md";
/*-------------------------X----------------------------*/

/*------------------------transition for Dialog--------------------*/
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up"
                  ref={ref} {...props} />;
});
/*-----------------------------------X-----------------------------*/

export default function Header() {
    const router = useRouter();

    /*-----------context authenication-----------*/
    const {login, logout, user, error} = useContext(AuthContext);

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const handleCloseErrorMessage = () => {
        setShowErrorMessage(!showErrorMessage);
    };

    useEffect(() => {
        error && setShowErrorMessage(true);
    });
    /*---------------------X---------------------*/

    /*-----------------context Bag---------------*/
    const {bag} = useContext(BagContext);
    /*---------------------X---------------------*/

    /*--------------context compare--------------*/
    const {productsCompare} = useContext(CompareContext);
    /*---------------------X---------------------*/

    /*---state for handle drawer menu (open/close)----*/
    const [drawerMenu, openDrawer, closeDrawer] = useDrawer(false);
    /*------------------------X-----------------------*/

    /*---state for handle shopping Bag (open/close)---*/
    const [shoppingDialog, openShoppingDialog, closeShoppingDialog] = useDrawer(
        false
    );
    /*-------------------------X---------------------------*/

    /*--state for handle compare dialog (open/close)--*/
    const [compareDialog, openCompareDialog, closeCompareDialog] = useDrawer(
        false
    );
    /*------------------------X-----------------------*/

    /*----------State scroll down for Navbar----------*/
    const [scrollState] = useScrollNavbar("");
    /*------------------------X-----------------------*/

    /*---------------State Login Dialog---------------*/
    const [loginDialog, openLoginDialog, closeLoginDialog] = useLoginDialog(
        false
    );
    /*------------------------X-----------------------*/

    /*-------------State for Input Login--------------*/
    const [email, handleChangeEmail] = useInputField("");
    const [password, handleChangePassword] = useInputField("");
    const [showPassword, handleShowPassword] = useShowPassword(false);
    /*------------------------X-----------------------*/

    const handleSubmit = evnt => {
        evnt.preventDefault();
        login({email, password});
    };

    // show Remember Alert
    const [showAlertRemember, setShowAlertRemember] = useState(false);
    const handleShowAlertRemember = () => {
        setShowAlertRemember(!showAlertRemember);
    };
    // xxxxxxxxxxxxxxxxxx

    const DialogLogin = (
        <div>
            {!user &&
                <li onClick={openLoginDialog}>تسجيل الدخول / اشتراك</li>}
            {user &&
                <li onClick={logout}>تسجيل الخروج</li>}

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

                    <Alert
                        style={{
                            maxWidth: "20rem",
                            textAlign: "center",
                            fontSize: "0.8rem"
                        }}
                        variant="danger"
                        dismissible
                        onClose={handleCloseErrorMessage}
                        show={showErrorMessage}
                    >
                        نعتذر كلمة المرور أو البريد الإلكتروني غير صحيح يرجى المحاولة مرة
                        أخرى
                    </Alert>

                    <Alert
                        style={{
                            maxWidth: "20rem",
                            textAlign: "center",
                            fontSize: "0.8rem",
                            color: "#333"
                        }}
                        variant="secondary"
                        dismissible
                        onClose={handleShowAlertRemember}
                        show={showAlertRemember}
                    >
                        يرجى ملاحظة أننا نستخدم ملفات تعريف الارتباط للاحتفاظ بتسجيل الدخول
                        الخاص بك لمدة أسبوع ، وبعد ذلك يتم تسجيل الخروج تلقائيًا ، إذا كنت
                        لا تريد الاحتفاظ بتسجيل الدخول فيمكنك الضغط على خيار تسجيل الخروج من
                        القائمة
                    </Alert>

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
                                <label className="form-check-label"
                                       htmlFor="form2Example3"
                                >
                                    تذكرني
                                    <FiAlertCircle
                                        onClick={handleShowAlertRemember}
                                        className={styles.alertIcon}
                                    />
                                </label>
                            </div>
                            <button type="submit"
                                    className={styles.signInBtn}
                            >
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
                                <button type="submit"
                                        className={styles.registerBtn}
                                >
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
                        <div>{WomanCollections}</div>

                        <div>{MenCollections}</div>

                        <div>{KidsCollections}</div>

                        <div>{AccessoriesCollections}</div>

                        <div>{MoreCollections}</div>
                        {router.pathname === "/account/login" ||
                        router.pathname === "/account/checkout-login" ? null : (
                            <div className={styles.link}>{DialogLogin}</div>
                        )}
                    </ul>
                </div>

                <div className={styles.containerIcons}>
                    <MdLanguage className={styles.languageIcon} />
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
                        <HiOutlineShoppingBag
                            onClick={openShoppingDialog}
                            className={styles.bagIcon}
                        />
                    </Badge>
                    <Badge color="error"
                           variant="dot"
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
                            horizontal: "right"
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
                            className={styles.accountIcon}
                        />
                    ) : (
                        <RiAccountPinCircleLine
                            onClick={() => router.push("/account/login")}
                            className={styles.accountIcon}
                        />
                    )}
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
                </div>
            </nav>
        </div>
    );
}
