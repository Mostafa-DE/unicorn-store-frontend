import styles from "@/components/DrawerMenu/MenuDrawer.module.css";
import Link from "next/link";
import { useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { FaFacebookF } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

export default function Example({ drawerMenu, closeDrawerMenu }) {
  const router = useRouter();
  //TODO: add right types here
  // @ts-ignore
  const { logout, user } = useContext(AuthContext);

  return (
    <>
      <Offcanvas placement={"end"} show={drawerMenu} onHide={closeDrawerMenu}>
        <Offcanvas.Header closeButton>
          <img src="/images/unicorns-logo-2.png" alt="unicorns-logo" width={100} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <List>
            <Link href="/categories/women-fashions/midi-dresses" className={styles.link}>
              <ListItem>
                  Midi Dress
              </ListItem>
            </Link>
            <Link href="/categories/women-fashions/mini-dresses" className={styles.link}>
              <ListItem>
                  Mini Dress
              </ListItem>
            </Link>
            <Link href="/categories/women-fashions/long-dresses" className={styles.link}>
              <ListItem>
                  Long Dress
              </ListItem>
            </Link>
            <Link href="/categories/women-fashions/off-dresses" className={styles.link}>
              <ListItem>
                  Off Shoulder
              </ListItem>
            </Link>
            <Link href="/categories/women-fashions/hijab-dresses" className={styles.link}>
              <ListItem>
                  Hijab Dress
              </ListItem>
            </Link>
            <Link href="/categories/women-fashions/suit-dresses" className={styles.link}>
              <ListItem>
                  Suits
              </ListItem>
            </Link>
            <Link href="/categories/women-fashions/jsuit-dresses" className={styles.link}>
              <ListItem>
                  Jumpsuits
              </ListItem>
            </Link>
            <Link href="/categories/women-fashions/a-dresses" className={styles.link}>
              <ListItem>
                  A - Line Dress
              </ListItem>
            </Link>
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
                  target="_blank"
                  type="button"
                  className={styles.social}
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/unicornsstore_jo/"
                  target="_blank"
                  type="button"
                  className={styles.social}
                >
                  <SiInstagram />
                </a>
                <a
                  href="https://twitter.com/login"
                  target="_blank"
                  type="button"
                  className={styles.social}
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
