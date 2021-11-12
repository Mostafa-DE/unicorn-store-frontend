import styles from "@/styles/MenuDrawer.module.css";
import Link from "next/link";
import Offcanvas from "react-bootstrap/Offcanvas";
import useOpenCategoryMenu from "@/Hooks/useOpenCategoryMenu";
import { BsPlus } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";

export default function Example({ drawerMenu, closeDrawerMenu }) {
  const [openCategoriesWomen, handleOpenCategoriesWomen] =
    useOpenCategoryMenu(false);
  const [openWomenTurkeyProducts, handleOpenWomenTurkeyProducts] =
    useOpenCategoryMenu(false);
  const [openWomenLocalProducts, handleOpenWomenLocalProducts] =
    useOpenCategoryMenu(false);
  const [openMenProducts, handleOpenMenProducts] = useOpenCategoryMenu(false);
  const [openKidsProducts, handleOpenKidsProducts] = useOpenCategoryMenu(false);
  const [openCategoriesAccessories, handleOpenCategoriesAccessories] =
    useOpenCategoryMenu(false);
  const [openWomenAccessories, handleOpenWomenAccessories] =
    useOpenCategoryMenu(false);
  const [openMenAccessories, handleOpenMenAccessories] =
    useOpenCategoryMenu(false);
  const [openKidsAccessories, handleOpenKidsAccessories] =
    useOpenCategoryMenu(false);
  const [openOtherCategories, handleOpenOtherCategories] =
    useOpenCategoryMenu(false);

  const WomenTurkeyProducts = (
    <List component="div" disablePadding>
      <ListItem button onClick={handleOpenWomenTurkeyProducts}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span className={styles.menuText}> المنتجات التركية </span>
          {openWomenTurkeyProducts ? <AiOutlineMinus /> : <BsPlus />}
        </div>
      </ListItem>
      <Collapse in={openWomenTurkeyProducts} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/categories/women-fashions/turkey-dresses/dresses">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>فساتين سهرة</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/women-fashions/turkey-lingeries/lingerie">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>ﻻنجري</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/women-fashions/turkey-abayas/abaya">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>عبايات و قطافين</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/women-fashions/turkey-all-products/other-products">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>جميع المنتجات</span>
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
            width: "100%",
          }}
        >
          <span className={styles.menuText}> المنتجات المحلية </span>
          {openWomenLocalProducts ? <AiOutlineMinus /> : <BsPlus />}
        </div>
      </ListItem>
      <Collapse in={openWomenLocalProducts} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/categories/women-fashions/local-dresses/dresses">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>فساتين سهرة</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/women-fashions/local-lingeries/lingerie">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>ﻻنجري</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/women-fashions/local-abayas/abaya">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>عبايات و قطافين</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/women-fashions/local-all-products/other-products">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>جميع المنتجات</span>
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
            width: "100%",
          }}
        >
          <span className={styles.menuText}> قسم النساء </span>
          {openWomenAccessories ? <AiOutlineMinus /> : <BsPlus />}
        </div>
      </ListItem>
      <Collapse in={openWomenAccessories} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/categories/accessories/women/women-necklace/necklace">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>قلادات</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/accessories/women/women-rings/rings">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>خواتم</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/accessories/women/women-bracelets/bracelets">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>أساور</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/accessories/women/all-products/other-products">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>جميع المنتجات</span>
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
            width: "100%",
          }}
        >
          <span className={styles.menuText}> قسم الرجال </span>
          {openMenAccessories ? <AiOutlineMinus /> : <BsPlus />}
        </div>
      </ListItem>
      <Collapse in={openMenAccessories} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/categories/accessories/men/men-watches/watches">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>ساعات</span>
              </ListItemIcon>
            </ListItem>
          </Link>

          <Link href="/categories/accessories/men/all-products/other-products">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>جميع المنتجات</span>
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
            width: "100%",
          }}
        >
          <span className={styles.menuText}> قسم الأطفال </span>
          {openKidsAccessories ? <AiOutlineMinus /> : <BsPlus />}
        </div>
      </ListItem>
      <Collapse in={openKidsAccessories} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href="/categories/accessories/kids/all-products/products">
            <ListItem button>
              <ListItemIcon>
                <span className={styles.menuText}>جميع المنتجات</span>
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
          <List className={styles.mainDrawer}>
            <ListItem button onClick={handleOpenCategoriesWomen}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span className={styles.menuText}> قسم النساء</span>
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
          <List className={styles.mainDrawer}>
            <ListItem button onClick={handleOpenMenProducts}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span className={styles.menuText}> قسم الرجال</span>
                {openMenProducts ? <AiOutlineMinus /> : <BsPlus />}
              </div>
            </ListItem>
            <Collapse in={openMenProducts} timeout="auto" unmountOnExit>
              <Link href="/categories/men-fashions/men-pajamas/pajamas">
                <ListItem button>
                  <ListItemIcon>
                    <span className={styles.menuText}>البيجامات</span>
                  </ListItemIcon>
                </ListItem>
              </Link>

              <Link href="/categories/men-fashions/all-products/other-products">
                <ListItem button>
                  <ListItemIcon>
                    <span className={styles.menuText}>جميع المنتجات</span>
                  </ListItemIcon>
                </ListItem>
              </Link>
            </Collapse>
          </List>
          {/*---------------------------X------------------------------*/}

          {/*--------------------Kids Categories---------------------*/}
          <List className={styles.mainDrawer}>
            <ListItem button onClick={handleOpenKidsProducts}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span className={styles.menuText}> قسم الأطفال</span>
                {openKidsProducts ? <AiOutlineMinus /> : <BsPlus />}
              </div>
            </ListItem>
            <Collapse in={openKidsProducts} timeout="auto" unmountOnExit>
              <Link href="/categories/kids-fashions/kids-pajamas/pajamas">
                <ListItem button>
                  <ListItemIcon>
                    <span className={styles.menuText}>البيجامات</span>
                  </ListItemIcon>
                </ListItem>
              </Link>

              <Link href="/categories/kids-fashions/kids-dresses/dresses">
                <ListItem button>
                  <ListItemIcon>
                    <span className={styles.menuText}>فساتين</span>
                  </ListItemIcon>
                </ListItem>
              </Link>

              <Link href="/categories/kids-fashions/all-products/other-products">
                <ListItem button>
                  <ListItemIcon>
                    <span className={styles.menuText}>جميع المنتجات</span>
                  </ListItemIcon>
                </ListItem>
              </Link>
            </Collapse>
          </List>
          {/*---------------------------X------------------------------*/}

          {/*--------------------Accessories Categories---------------------*/}
          <List className={styles.mainDrawer}>
            <ListItem button onClick={handleOpenCategoriesAccessories}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span className={styles.menuText}> قسم الإكسسوارات</span>
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
          <List className={styles.mainDrawer}>
            <ListItem button onClick={handleOpenOtherCategories}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span className={styles.menuText}> الأقسام الأخرى</span>
                {openOtherCategories ? <AiOutlineMinus /> : <BsPlus />}
              </div>
            </ListItem>
            <Collapse in={openOtherCategories} timeout="auto" unmountOnExit>
              <Link href="/categories/makeup/products">
                <ListItem button>
                  <ListItemIcon>
                    <span className={styles.menuText}>قسم التجميل</span>
                  </ListItemIcon>
                </ListItem>
              </Link>

              <Link href="/categories/packages/products">
                <ListItem button>
                  <ListItemIcon>
                    <span className={styles.menuText}>قسم الباكيجات</span>
                  </ListItemIcon>
                </ListItem>
              </Link>

              <Link href="/categories/houseware/products">
                <ListItem button>
                  <ListItemIcon>
                    <span className={styles.menuText}>
                      قسم الأدوات المنزلية
                    </span>
                  </ListItemIcon>
                </ListItem>
              </Link>
            </Collapse>
          </List>
          {/*---------------------------X------------------------------*/}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
