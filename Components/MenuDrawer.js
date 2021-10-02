import styles from "@/styles/MenuDrawer.module.css";
import React, { useState } from "react";
import Link from "next/link";

/*----------------------material ui----------------------*/
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
/*-------------------------X----------------------------*/

/*--------------------React Icons------------------------*/
import { FaTimes } from "react-icons/fa";
/*-------------------------X----------------------------*/

export default function MenuDrawer({ closeDrawerMenu, drawerMenu }) {
  /*----------state for products category-----------*/
  const [openCategory, setOpenCategory] = useState(true);

  const handleOpenCategory = () => {
    setOpenCategory(!openCategory);
  };
  /*------------------------X------------------------*/

  const drawerContent = (
    <div>
      <List className={styles.mainDrawer}>
        <Link href="/" passHref={true}>
          <ListItem button>
            <ListItemText className={styles.listItemText}>
              <div>
                {" "}
                <span className={styles.menuText}> 11111 </span>
              </div>
            </ListItemText>
          </ListItem>
        </Link>

        {/*--------------------Products Category---------------------*/}
        <ListItem button onClick={handleOpenCategory}>
          <ListItemIcon>
            <span className={styles.menuText}> test</span>
          </ListItemIcon>

          {openCategory ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCategory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/products/products-list" passHref={true}>
              <ListItem button>
                <ListItemIcon>
                  <span className={styles.menuText}>test</span>
                </ListItemIcon>
              </ListItem>
            </Link>

            <Link href="/category/tools" passHref={true}>
              <ListItem button>
                <ListItemIcon>
                  <span className={styles.menuText}>test</span>
                </ListItemIcon>
              </ListItem>
            </Link>

            <Link href="/category/houseware" passHref={true}>
              <ListItem button>
                <ListItemIcon>
                  <span className={styles.menuText}>test</span>
                </ListItemIcon>
              </ListItem>
            </Link>

            <Link href="/category/kids" passHref={true}>
              <ListItem button>
                <ListItemIcon>
                  <span className={styles.menuText}>test</span>
                </ListItemIcon>
              </ListItem>
            </Link>

            <Link href="/category/personal-care" passHref={true}>
              <ListItem button>
                <ListItemIcon>
                  <span className={styles.menuText}>test</span>
                </ListItemIcon>
              </ListItem>
            </Link>

            <Link href="/category/houseware" passHref={true}>
              <ListItem button>
                <ListItemIcon>
                  <span className={styles.menuText}>test</span>
                </ListItemIcon>
              </ListItem>
            </Link>
          </List>
        </Collapse>
        {/*----------------------------X-----------------------------*/}

        <Link href="/products/shopping-cart" passHref={true}>
          <ListItem button>
            <ListItemText className={styles.listItemText}>
              <div>
                <span className={styles.menuText}>test</span>
              </div>
            </ListItemText>
          </ListItem>
        </Link>

        <Link href="/contact" passHref={true}>
          <ListItem button>
            <ListItemText className={styles.listItemText}>
              <div>
                {" "}
                <span className={styles.menuText}>test</span>
              </div>
            </ListItemText>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer anchor="right" open={drawerMenu} style={{ opacity: 0.97 }}>
        {/*-----------------Close button icon------------*/}
        <div onClick={closeDrawerMenu}>
          <IconButton onClick={closeDrawerMenu}>
            <FaTimes />
          </IconButton>
        </div>
        {/*--------------------------X-------------------*/}
        {drawerContent}
      </Drawer>
    </div>
  );
}
