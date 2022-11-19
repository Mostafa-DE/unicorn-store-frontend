import styles from "@/components/DrawerMenu/MenuDrawer.module.css";
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
import { WomenCategoriesProducts } from "./categoriesData/womenTurkeyProducts";
import { menProducts } from "./categoriesData/menProducts";
import { kidsProducts } from "./categoriesData/kidsProducts";
import { WomenAccessoriesProducts } from "./categoriesData/womenAccessoriesProducts";
import { menAccessoriesProducts } from "./categoriesData/menAccessoriesProducts";
import { kidsAccessoriesProducts } from "./categoriesData/kidsAccessoriesProducts";
import { otherProducts } from "./categoriesData/otherProducts";

export default function Example({ drawerMenu, closeDrawerMenu }) {
  const router = useRouter();
  //TODO: add right types here
  // @ts-ignore
  const { logout, user } = useContext(AuthContext);
  const [openCategoriesWomen, handleOpenCategoriesWomen] =
    useOpenCategoryMenu();
  const [openCategoriesAccessories, handleOpenCategoriesAccessories] =
    useOpenCategoryMenu();
  const [openWomenTurkeyProducts, handleOpenWomenTurkeyProducts] =
    useOpenCategoryMenu();
  const [openMenProducts, handleOpenMenProducts] = useOpenCategoryMenu();
  const [openKidsProducts, handleOpenKidsProducts] = useOpenCategoryMenu();
  const [openWomenAccessories, handleOpenWomenAccessories] =
    useOpenCategoryMenu();
  const [openMenAccessories, handleOpenMenAccessories] = useOpenCategoryMenu();
  const [openKidsAccessories, handleOpenKidsAccessories] =
    useOpenCategoryMenu();
  const [openOtherCategories, handleOpenOtherCategories] =
    useOpenCategoryMenu();

  const WomenTurkeyProducts = (
    <>
      {WomenCategoriesProducts.map((category) => (
        <List component="div" disablePadding key={category.title}>
          <ListItem
            button
            //TODO: add right types here
            // @ts-ignore
            onClick={handleOpenWomenTurkeyProducts}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span> {category.title} </span>
              {openWomenTurkeyProducts ? <AiOutlineMinus /> : <BsPlus />}
            </div>
          </ListItem>

          <Collapse
            //TODO: add right types here
            // @ts-ignore
            in={openWomenTurkeyProducts}
            timeout="auto"
            unmountOnExit
          >
            {category.productsData.map((data) => (
              <List component="div" disablePadding key={data.title}>
                <Link href={data.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <span>{data.title}</span>
                    </ListItemIcon>
                  </ListItem>
                </Link>
              </List>
            ))}
          </Collapse>
        </List>
      ))}
    </>
  );

  const MenProducts = (
    <>
      {menProducts.map((category) => (
        <List key={category.title}>
          <ListItem
            button
            //TODO: add right types here
            // @ts-ignore
            onClick={handleOpenMenProducts}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span>{category.title}</span>
              {openMenProducts ? <AiOutlineMinus /> : <BsPlus />}
            </div>
          </ListItem>
          <Collapse
            //TODO: add right types here
            // @ts-ignore
            in={openMenProducts}
            timeout="auto"
            unmountOnExit
          >
            {category.productsData.map((data) => (
              <Link href={data.link} key={data.title}>
                <ListItem button>
                  <ListItemIcon>
                    <span>{data.title}</span>
                  </ListItemIcon>
                </ListItem>
              </Link>
            ))}
          </Collapse>
        </List>
      ))}
    </>
  );

  const KidsProducts = (
    <>
      {kidsProducts.map((category) => (
        <List key={category.title}>
          <ListItem
            button
            //TODO: add right types here
            // @ts-ignore
            onClick={handleOpenKidsProducts}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span>{category.title}</span>
              {openKidsProducts ? <AiOutlineMinus /> : <BsPlus />}
            </div>
          </ListItem>
          <Collapse
            //TODO: add right types here
            // @ts-ignore
            in={openKidsProducts}
            timeout="auto"
            unmountOnExit
          >
            {category.productsData.map((data) => (
              <Link href={data.link} key={data.title}>
                <ListItem button>
                  <ListItemIcon>
                    <span>{data.title}</span>
                  </ListItemIcon>
                </ListItem>
              </Link>
            ))}
          </Collapse>
        </List>
      ))}
    </>
  );

  const WomenAccessories = (
    <>
      {WomenAccessoriesProducts.map((category) => (
        <List component="div" disablePadding key={category.title}>
          <ListItem
            button
            //TODO: add right types here
            // @ts-ignore
            onClick={handleOpenWomenAccessories}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span> {category.title} </span>
              {openWomenAccessories ? <AiOutlineMinus /> : <BsPlus />}
            </div>
          </ListItem>
          <Collapse
            //TODO: add right types here
            // @ts-ignore
            in={openWomenAccessories}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {category.productsData.map((data) => (
                <Link href={data.link} key={data.title}>
                  <ListItem button>
                    <ListItemIcon>
                      <span>{data.title}</span>
                    </ListItemIcon>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>
      ))}
    </>
  );

  const MenAccessories = (
    <>
      {menAccessoriesProducts.map((category) => (
        <List component="div" disablePadding key={category.title}>
          <ListItem
            button
            //TODO: add right types here
            // @ts-ignore
            onClick={handleOpenMenAccessories}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span> {category.title} </span>
              {openMenAccessories ? <AiOutlineMinus /> : <BsPlus />}
            </div>
          </ListItem>
          <Collapse
            //TODO: add right types here
            // @ts-ignore
            in={openMenAccessories}
            timeout="auto"
            unmountOnExit
          >
            {category.productsData.map((data) => (
              <List component="div" disablePadding key={data.title}>
                <Link href={data.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <span>{data.title}</span>
                    </ListItemIcon>
                  </ListItem>
                </Link>
              </List>
            ))}
          </Collapse>
        </List>
      ))}
    </>
  );

  const KidsAccessories = (
    <>
      {kidsAccessoriesProducts.map((category) => (
        <List component="div" disablePadding key={category.title}>
          <ListItem
            button
            //TODO: add right types here
            // @ts-ignore
            onClick={handleOpenKidsAccessories}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span> {category.title} </span>
              {openKidsAccessories ? <AiOutlineMinus /> : <BsPlus />}
            </div>
          </ListItem>
          <Collapse
            //TODO: add right types here
            // @ts-ignore
            in={openKidsAccessories}
            timeout="auto"
            unmountOnExit
          >
            {category.productsData.map((data) => (
              <List component="div" disablePadding key={data.title}>
                <Link href={data.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <span>{data.title}</span>
                    </ListItemIcon>
                  </ListItem>
                </Link>
              </List>
            ))}
          </Collapse>
        </List>
      ))}
    </>
  );

  const OtherProducts = (
    <>
      {otherProducts.map((category) => (
        <List key={category.title}>
          <ListItem
            button
            //TODO: add right types here
            // @ts-ignore
            onClick={handleOpenOtherCategories}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span>{category.title}</span>
              {openOtherCategories ? <AiOutlineMinus /> : <BsPlus />}
            </div>
          </ListItem>
          <Collapse
            //TODO: add right types here
            // @ts-ignore
            in={openOtherCategories}
            timeout="auto"
            unmountOnExit
          >
            {category.productsData.map((data) => (
              <Link href={data.link} key={data.title}>
                <ListItem button>
                  <ListItemIcon>
                    <span>{data.title}</span>
                  </ListItemIcon>
                </ListItem>
              </Link>
            ))}
          </Collapse>
        </List>
      ))}
    </>
  );

  return (
    <>
      <Offcanvas placement={"end"} show={drawerMenu} onHide={closeDrawerMenu}>
        <Offcanvas.Header closeButton>
          <img src="/images/unicorn.png" alt="unicorns-logo" width={100} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/*--------------------Women Categories--------------------*/}
          <List>
            <ListItem
              button
              //TODO: add right types here
              // @ts-ignore
              onClick={handleOpenCategoriesWomen}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span> قسم النساء</span>
                {openCategoriesWomen ? <AiOutlineMinus /> : <BsPlus />}
              </div>
            </ListItem>
            <Collapse
              //TODO: add right types here
              // @ts-ignore
              in={openCategoriesWomen}
              timeout="auto"
              unmountOnExit
            >
              {WomenTurkeyProducts}
            </Collapse>
          </List>
          {/*---------------------------X----------------------------*/}

          {/*--------------------Men Categories----------------------*/}
          {MenProducts}
          {/*---------------------------X----------------------------*/}

          {/*--------------------Kids Categories---------------------*/}
          {KidsProducts}
          {/*---------------------------X----------------------------*/}

          {/*-------------------Accessories Categories---------------*/}
          <List>
            <ListItem
              button
              //TODO: add right types here
              // @ts-ignore
              onClick={handleOpenCategoriesAccessories}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span> قسم الإكسسوارات</span>
                {openCategoriesAccessories ? <AiOutlineMinus /> : <BsPlus />}
              </div>
            </ListItem>
            <Collapse
              //TODO: add right types here
              // @ts-ignore
              in={openCategoriesAccessories}
              timeout="auto"
              unmountOnExit
            >
              {WomenAccessories}
              {MenAccessories}
              {KidsAccessories}
            </Collapse>
          </List>
          {/*---------------------------X----------------------------*/}

          {/*--------------------Other Categories--------------------*/}
          {OtherProducts}
          {/*---------------------------X----------------------------*/}

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
