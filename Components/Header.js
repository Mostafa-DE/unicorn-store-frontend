import styles from "@/styles/Header.module.css";
import React, { useState } from "react";
import Link from "next/link";

import useDrawer from "@/Hooks/useDrawer";

/*----------------------Components-----------------------*/
import MenuDrawer from "./MenuDrawer";
import CartDrawer from "@/components/CartDrawer";
/*-------------------------X-----------------------------*/

/*--------------------React Icons------------------------*/
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { ImHeart } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
/*-------------------------X----------------------------*/

/*------------------------X-----------------------*/

export default function Header() {
  /*---state for handle drawer menu (open/close)----*/
  const [drawerMenu, openDrawer, closeDrawer] = useDrawer(false);
  /*------------------------X-----------------------*/

  /*---state for handle drawer cart (open/close)----*/
  const [drawerCart, openDrawerCart, closeDrawerCart] = useDrawer(false);
  /*------------------------X-----------------------*/

  return (
    <div className={styles.main}>
      <nav className={styles.containerNav}>
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
            <li className={styles.linkProducts}>
              Products <IoIosArrowDown />
            </li>
            <Link href="account/my-account">
              <li className={styles.link}>My Account</li>
            </Link>
            <Link href="account/login">
              <li className={styles.link}>Sign In</li>
            </Link>
            <Link href="contact">
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
