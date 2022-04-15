import styles from "@/components/DialogShoppingBag/DialogShoppingBag.module.css";
import React, {useContext} from "react";
import Link from "next/link";
import {BagContext} from "@/context/BagContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {HiMinusSm} from "react-icons/hi";
import {HiPlusSm} from "react-icons/hi";
import {AiOutlineLine} from "react-icons/ai";
import {FaTrash} from "react-icons/fa";
import {VscClose} from "react-icons/vsc";
import {useRouter} from "next/router";

export default function DialogShoppingBag({shoppingDialog, closeShoppingDialog, user}) {
    const router = useRouter();

    // shopping bag context
    const {bag, increaseQty, decreaseQty, removeFromBag} =
        useContext(BagContext);
    const {items = []} = bag;

    return (
        <div>
            <Dialog
                open={shoppingDialog}
                onClose={closeShoppingDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div data-aos="fade-in"
                         className={styles.containerTitle}
                    >
                        <p className={styles.titleShoppingBag}> حقيبة التسوق </p>
                        <AiOutlineLine className="lineIcon"/>
                    </div>
                    <div className={styles.closeIcon}>
                        <VscClose onClick={closeShoppingDialog}/>
                    </div>
                </DialogTitle>
                <DialogContent>
                    {items.length !== 0 ? (
                        <>
                            <div className={styles.containerTableDetails}>
                                <TableContainer>
                                    <Table
                                        data-aos="fade-in"
                                        sx={{minWidth: 540}}
                                        aria-label="simple table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={styles.fontFamily}
                                                           align="center"
                                                >
                                                    المنتج
                                                </TableCell>
                                                <TableCell className={styles.fontFamily}>
                                                    السعر
                                                </TableCell>
                                                <TableCell className={styles.fontFamily}
                                                           align="center"
                                                >
                                                    الكمية
                                                </TableCell>
                                                <TableCell className={styles.fontFamily}>
                                                    الإجمالي
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {items.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell
                                                        align="center"
                                                        className={styles.fontFamily}
                                                    >
                                                        <div className={styles.containerItemCell}>
                                                            <div>
                                                                <img
                                                                    src={item.images[0].url}
                                                                    width={100}
                                                                    height={100}
                                                                    alt="Item Image.."
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className={styles.nameItem}>{item.name}</p>
                                                                <p>{item.color}</p>
                                                                <p>
                                                                    {item.size}{" "}
                                                                    {item.size !== "" ? ":القياس" : null}
                                                                </p>
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
                                                                <FaTrash
                                                                    className={styles.deleteBtnWhenQtyEqualsOne}
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
                            </div>
                            <div className={styles.mainBoxAmountDetails}>
                                <div className={styles.containerBoxAmountDetails}>
                                    <p data-aos="fade-in"
                                       className={styles.totalAmount}
                                    >
                                        {bag.totalBag} JD :السعر الإجمالي
                                    </p>

                                    <div className={styles.containerBtns}>
                                        <Link href="/products/shopping-bag">
                                            <button className={styles.continueShoppingBtn}>
                                                عرض سلة التسوق
                                            </button>
                                        </Link>
                                        {user === null ? (
                                            <button
                                                onClick={() => router.push("/account/checkout-login")}
                                                className={styles.checkoutBtn}
                                            >
                                                اطلب الآن
                                            </button>
                                        ) : (
                                            <button
                                                className={styles.checkoutBtn}
                                                onClick={() => router.push("/payment/shipping-info")}
                                            >
                                                اطلب الآن
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={styles.containerShoppingBagEmpty}>
                            <h1> حقيبة التسوق الخاصة بك فارغة</h1>
                            <p>أضف بعض المنتجات لتظهر هنا</p>
                            <Link href="/">
                                <button className={styles.continueShoppingBtn}>
                                    أكمل التسوق
                                </button>
                            </Link>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
