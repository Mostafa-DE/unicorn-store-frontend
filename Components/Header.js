import styles from "@/styles/Header.module.css";
import Link from "next/link";
import React from "react";
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

  const handleSubmit = () => {
    console.log("Submit :)");
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
            <Link href="/">
              <li className={styles.link}>Home</li>
            </Link>

            <div>
              <div className={styles.dropDown}>
                <li className={styles.linkProducts}>
                  Products <IoIosArrowDown />
                </li>
                <div className={styles.dropDownContent}>
                  <div className={styles.containerDropDownContent}>
                    <div className={styles.womenDiv}>
                      <p>Women</p>
                      <span>turkish made</span>
                      <ul>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              evening dresses
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>lingerie</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              abaya & Qatafin{" "}
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a
                              className={`${styles.categoryLink} ${styles.collectionText}`}
                              style={{ padding: "1rem 0 2rem 0" }}
                            >
                              Collections
                            </a>
                          </Link>
                        </li>
                      </ul>

                      <span className={styles.localMade}>local made</span>
                      <ul>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              evening dresses
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>lingerie</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              abaya & Qatafin{" "}
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a
                              className={styles.categoryLink}
                              style={{ padding: "1rem 0 2rem 0" }}
                            >
                              Collections
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className={styles.womenDiv}>
                      <p>Women</p>
                      <span>turkish made</span>
                      <ul>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              evening dresses
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>lingerie</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              abaya & Qatafin{" "}
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a
                              className={`${styles.categoryLink} ${styles.collectionText}`}
                              style={{ padding: "1rem 0 2rem 0" }}
                            >
                              Collections
                            </a>
                          </Link>
                        </li>
                      </ul>

                      <span className={styles.localMade}>local made</span>
                      <ul>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              evening dresses
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>lingerie</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              abaya & Qatafin{" "}
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a
                              className={styles.categoryLink}
                              style={{ padding: "1rem 0 2rem 0" }}
                            >
                              Collections
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className={styles.womenDiv}>
                      <p>Women</p>
                      <span>turkish made</span>
                      <ul>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              evening dresses
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>lingerie</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              abaya & Qatafin{" "}
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a
                              className={`${styles.categoryLink} ${styles.collectionText}`}
                              style={{ padding: "1rem 0 2rem 0" }}
                            >
                              Collections
                            </a>
                          </Link>
                        </li>
                      </ul>

                      <span className={styles.localMade}>local made</span>
                      <ul>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              evening dresses
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>lingerie</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              abaya & Qatafin{" "}
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a
                              className={styles.categoryLink}
                              style={{ padding: "1rem 0 2rem 0" }}
                            >
                              Collections
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className={styles.womenDiv}>
                      <p>Women</p>
                      <span>turkish made</span>
                      <ul>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              evening dresses
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>lingerie</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              abaya & Qatafin{" "}
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a
                              className={`${styles.categoryLink} ${styles.collectionText}`}
                              style={{ padding: "1rem 0 2rem 0" }}
                            >
                              Collections
                            </a>
                          </Link>
                        </li>
                      </ul>

                      <span className={styles.localMade}>local made</span>
                      <ul>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              evening dresses
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>lingerie</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className={styles.categoryLink}>
                              abaya & Qatafin{" "}
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a
                              className={styles.categoryLink}
                              style={{ padding: "1rem 0 2rem 0" }}
                            >
                              Collections
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/account/my-account">
              <li className={styles.link}>My Account</li>
            </Link>

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
