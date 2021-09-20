import styles from "@/styles/Header.module.css";
import Link from "next/link";
import "animate.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

/*--------------------Components-------------------------*/
import MenuDrawer from "./MenuDrawer";
import CartDrawer from "@/components/CartDrawer";
/*-------------------------X-----------------------------*/

/*--------------------Material Ui------------------------*/
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
/*-------------------------X-----------------------------*/

/*----------------------Context--------------------------*/
import { AuthContext } from "@/context/AuthContext";
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
import { AiOutlineSearch } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { ImHeart } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { FiAlertCircle } from "react-icons/fi";
/*-------------------------X----------------------------*/

/*------------------------transition for Dialog--------------------*/
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
/*-----------------------------------X-----------------------------*/

export default function Header() {
  /*-----------context authenication-----------*/
  const { login, logout, user, error } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    error && toast.error(error);
  });

  /*---------------------X---------------------*/

  /*---state for handle drawer menu (open/close)----*/
  const [drawerMenu, openDrawer, closeDrawer] = useDrawer(false);
  /*------------------------X-----------------------*/

  /*---state for handle drawer cart (open/close)----*/
  const [drawerCart, openDrawerCart, closeDrawerCart] = useDrawer(false);
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
      <li onClick={openLoginDialog}>sign in</li>
      <Dialog
        open={loginDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeLoginDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <ValidatorForm onSubmit={handleSubmit}>
          <p className={styles.titleDialog}>{"Sign In"}</p>

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
                label="Email Address"
                validators={["required"]}
                errorMessages={["You can't leave this field empty !!"]}
              />
              <div className={styles.containerPassword}>
                <TextValidator
                  type={showPassword === true ? "text" : "password"}
                  onChange={handleChangePassword}
                  value={password}
                  fullWidth
                  variant="standard"
                  label="Password"
                  validators={["required"]}
                  errorMessages={["You can't leave this field empty !!"]}
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
                  Remember Me
                  <FiAlertCircle className={styles.alertIcon} />
                </label>
              </div>
              <button type="submit" className={styles.signInBtn}>
                Sign In
              </button>
              <Link href="/account/forgot-password">
                <a className={styles.forgotPassword}>
                  Forgotten your password ?
                </a>
              </Link>
              <p className={styles.noAccountText}>
                Don't currently have an account ?
              </p>
              <Link href="/account/register">
                <button type="submit" className={styles.registerBtn}>
                  Create An Account
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
        women <IoIosArrowDown />
      </li>
      <div className={styles.dropDownContent}>
        <div className={styles.containerDropDownContent}>
          <div className={styles.collectionsDiv}>
            <p>Women Fashions</p>
            <span>turkey products</span>
            <ul>
              <li>
                <Link href="/categories/women-fashions/turkey/dresses">
                  <a className={styles.categoryLink}>evening dresses</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/women-fashions/turkey/lingerie">
                  <a className={styles.categoryLink}>lingerie</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/women-fashions/turkey/abaya">
                  <a className={styles.categoryLink}>abaya & Qatafin </a>
                </Link>
              </li>
              <li>
                <Link href="/categories/women-fashions/turkey/other-products">
                  <a
                    className={`${styles.categoryLink} ${styles.collectionText}`}
                    style={{ padding: "1rem 0 2rem 0" }}
                  >
                    Other Products
                  </a>
                </Link>
              </li>
            </ul>

            <span>local products</span>
            <ul>
              <li>
                <Link href="/categories/women-fashions/local/dresses">
                  <a className={styles.categoryLink}>evening dresses</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/women-fashions/local/lingerie">
                  <a className={styles.categoryLink}>lingerie</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/women-fashions/local/abaya">
                  <a className={styles.categoryLink}>abaya & Qatafin </a>
                </Link>
              </li>
              <li>
                <Link href="/categories/women-fashions/local/other-products">
                  <a
                    className={styles.categoryLink}
                    style={{ padding: "1rem 0 2rem 0" }}
                  >
                    Other Products
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.img}>
            <img
              src="/images/unicorn/women fashions.jpg"
              width={380}
              height={470}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const MenCollections = (
    <div className={styles.dropDown}>
      <li className={styles.linkProducts}>
        men <IoIosArrowDown />
      </li>
      <div className={styles.dropDownContent}>
        <div className={styles.containerDropDownContent}>
          <div className={styles.collectionsDiv}>
            <p>Men Fashions</p>
            <ul>
              <li>
                <Link href="/categories/men-fashions/pajamas">
                  <a className={styles.categoryLink}>pajamas</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/men-fashions/other-products">
                  <a className={styles.categoryLink}>Other products</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.img}>
            <img
              src="/images/unicorn/men fashions.jpg"
              width={400}
              height={380}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const KidsCollections = (
    <div className={styles.dropDown}>
      <li className={styles.linkProducts}>
        kids <IoIosArrowDown />
      </li>
      <div className={styles.dropDownContent}>
        <div className={styles.containerDropDownContent}>
          <div className={styles.collectionsDiv}>
            <p>Kids Fashions</p>
            <span>turkey products</span>
            <ul>
              <li>
                <Link href="/categories/kids-fashions/pajamas">
                  <a className={styles.categoryLink}>pajamas</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/kids-fashions/dresses">
                  <a className={styles.categoryLink}>Dresses</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/kids-fashions/other-products">
                  <a className={styles.categoryLink}>Other Products </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.img}>
            <img
              src="/images/unicorn/kids fashions.jpg"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const AccessoriesCollections = (
    <div className={styles.dropDown}>
      <li className={styles.linkProducts}>
        Accessories <IoIosArrowDown />
      </li>
      <div className={styles.dropDownContent}>
        <div className={styles.containerDropDownContent}>
          <div className={styles.collectionsDiv}>
            <p>Accessories Collections</p>
            <span>Women</span>
            <ul>
              <li>
                <Link href="/categories/accessories/women/necklace">
                  <a className={styles.categoryLink}>necklace</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories/women/rings">
                  <a className={styles.categoryLink}>rings</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories/women/bracelets">
                  <a className={styles.categoryLink}>Bracelets </a>
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories/women/other-products">
                  <a className={styles.categoryLink}>Other Collections </a>
                </Link>
              </li>
            </ul>
            <span>Men</span>
            <ul>
              <li>
                <Link href="/categories/accessories/men/watches">
                  <a className={styles.categoryLink}>watches</a>
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories/men/other-products">
                  <a className={styles.categoryLink}>Other Collections</a>
                </Link>
              </li>
            </ul>
            <span>Kids</span>
            <ul>
              <li>
                <Link href="/categories/accessories/kids/products">
                  <a
                    className={styles.categoryLink}
                    style={{ padding: "1rem 0 2rem 0" }}
                  >
                    All Products
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.img}>
            <img src="/images/unicorn/accessories.jpg" width={400} />
          </div>
        </div>
      </div>
    </div>
  );

  const MoreCollections = (
    <div className={styles.dropDown}>
      <li className={styles.linkProducts}>
        More <IoIosArrowDown />
      </li>
      <div className={styles.dropDownContent}>
        <div className={styles.containerDropDownContent}>
          <div className={styles.collectionsDiv}>
            <p>More Collections</p>
            <span>Makeup</span>
            <ul>
              <li>
                <Link href="/categories/makeup/products">
                  <a className={styles.categoryLink}>All Products</a>
                </Link>
              </li>
            </ul>

            <span>Packages</span>
            <ul>
              <li>
                <Link href="/categories/packages/products">
                  <a className={styles.categoryLink}>All Products</a>
                </Link>
              </li>
            </ul>

            <span>Houseware</span>
            <ul>
              <li>
                <Link href="/categories/houseware/products">
                  <a className={styles.categoryLink}>All Products</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.img}>
            <img src="/images/test/test1.jpg" width={400} />
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

            <Link href="/contact">
              <li className={styles.link}>Contact Us</li>
            </Link>
          </ul>
        </div>

        <div className={styles.containerIcons}>
          <HiOutlineShoppingBag
            className={styles.bagIcon}
            onClick={openDrawerCart}
          />
          <ImHeart className={styles.heartIcon} />
          <AiOutlineSearch className={styles.searchIcon} />
          <FiMenu className={styles.menuIcon} onClick={openDrawer} />
          <MenuDrawer closeDrawerMenu={closeDrawer} drawerMenu={drawerMenu} />
          <CartDrawer
            closeDrawerCart={closeDrawerCart}
            drawerCart={drawerCart}
          />
        </div>
      </nav>
    </div>
  );
}
