import styles from "@/styles/Header.module.css";
import Link from "next/link";

import useDrawer from "@/Hooks/useDrawer";

/*--------------------Components-------------------------*/
import MenuDrawer from "./MenuDrawer";
import CartDrawer from "@/components/CartDrawer";
/*-------------------------X-----------------------------*/

/*-----------------------Hooks---------------------------*/
import useScrollNavbar from "@/Hooks/useScrollNavbar";
/*-------------------------X-----------------------------*/

/*--------------------React Icons------------------------*/
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { ImHeart } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
/*-------------------------X----------------------------*/

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

            <li>
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
            </li>

            <Link href="/account/my-account">
              <li className={styles.link}>My Account</li>
            </Link>
            <Link href="/account/login">
              <li className={styles.link}>Sign In</li>
            </Link>
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
