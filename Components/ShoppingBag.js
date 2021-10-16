import styles from "@/styles/ShoppingBag.module.css";
import React, { useContext } from "react";
import { BagContext } from "@/context/BagContext";
import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { HiMinusSm } from "react-icons/hi";
import { HiPlusSm } from "react-icons/hi";
import { AiOutlineLine } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";

export default function ShoppingBag() {
  // shopping bag context
  const { bag, increaseQty, decreaseQty, removeFromBag } =
    useContext(BagContext);
  const { items = [] } = bag;
  console.log(bag);
  // xxxxxxxxxxxxxxxxxxxxx

  return (
    <div className={styles.main}>
      {items.length !== 0 ? (
        <div>
          <TableContainer>
            <Table className={styles.containerTable}>
              <TableHead>
                <TableRow>
                  <TableCell className={styles.fontFamily} align="left">
                    المنتج
                  </TableCell>
                  <TableCell className={styles.fontFamily}>السعر</TableCell>
                  <TableCell className={styles.fontFamily} align="center">
                    الكمية
                  </TableCell>
                  <TableCell align="center" className={styles.fontFamily}>
                    الإجمالي
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className={styles.fontFamily}>
                      <div className={styles.containerItemCell}>
                        <img
                          src={item.images[0].url}
                          width={100}
                          height={100}
                          alt="Item Image.."
                        />
                        <div className={styles.itemDetails}>
                          <p className={styles.nameItem}>{item.name}</p>
                          <p>أحمر</p>
                          <p>{item.sizeInput || item.size} :القياس</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.price} JD</TableCell>
                    <TableCell align="center">
                      {item.qty}
                      <div className={styles.addOrRemoveQty}>
                        {item.qty !== 1 ? (
                          <HiMinusSm
                            className={styles.minus}
                            onClick={() => decreaseQty(item)}
                          />
                        ) : (
                          <HiMinusSm
                            className={styles.minus}
                            onClick={() => removeFromBag(item)}
                          />
                        )}
                        <HiPlusSm
                          className={styles.plus}
                          onClick={() => increaseQty(item)}
                        />
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {item.price * item.qty} JD
                    </TableCell>
                    <TableCell>
                      <FaTrash
                        className={styles.deleteBtn}
                        onClick={() => removeFromBag(item)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className={styles.containerBoxAmountDetails}>
            <div className={styles.totalAmountDetails}>
              <p className={styles.subTotalText}>
                {bag.totalBag} JD :السعر الإجمالي
              </p>
              <p className={styles.deliveryNote}>
                {" "}
                أجور التوصيل تضاف عند الطلب
              </p>
            </div>
            <div className={styles.containerBtns}>
              <Link href="/">
                <button className={styles.continueShoppingBtn}>
                  أكمل التسوق
                </button>
              </Link>
              <button className={styles.checkoutBtn}>اطلب الآن</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.containerShoppingBagEmpty}>
          <h1> حقيبة التسوق الخاصة بك فارغة</h1>
          <p>أضف بعض المنتجات لتظهر هنا</p>
          <Link href="/">
            <button className={styles.continueShoppingBtn}>أكمل التسوق</button>
          </Link>
        </div>
      )}
    </div>
  );
}
