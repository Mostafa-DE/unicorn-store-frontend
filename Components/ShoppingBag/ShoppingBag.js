import styles from "@/components/ShoppingBag/ShoppingBag.module.css";
import React, {useContext} from "react";
import {BagContext} from "@/context/BagContext";
import Link from "next/link";
import {useRouter} from "next/router";
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
import {DialogAlert} from "@/helpers/DialogAlert"

export default function ShoppingBag({token}) {
    const router = useRouter();

    const {bag, increaseQty, decreaseQty, removeFromBag} = useContext(BagContext);
    const {items = []} = bag;

    const showDeleteIcon = (qty) => {
        return qty === 1;
    }

    const handleIncreaseQty = (item) => {
        if (item.qty >= 2) return DialogAlert("Sorry 😔", "OK", "The maximum quantity that can be ordered is 2.", "error")
        increaseQty(item)
    }

    return (
        <div className={styles.main}>
            <div data-aos="fade-in"
                 className="containerTitle"
            >
                <h1 className="h1Title"> حقيبة التسوق </h1>
                <AiOutlineLine className="lineIcon"/>
            </div>
            {items.length !== 0 ? (
                <>
                    <TableContainer style={{margin: "3.5rem 0 0 0"}}>
                        <Table data-aos="fade-in">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        <span>المنتج</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>السعر</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <span>الكمية</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        <span>الإجمالي</span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell
                                            sx={{width: "23rem"}}
                                            className={styles.fontFamily}
                                        >
                                            <div className={styles.containerItemCell}>
                                                <img
                                                    src={item.images[0].url}
                                                    width={100}
                                                    height={100}
                                                    alt="Item Image.."
                                                />
                                                <div className={styles.itemDetails}>
                                                    <p className={styles.nameItem}>{item.name}</p>
                                                    {/*<p>{item.color}</p>*/}
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
                                                {showDeleteIcon(item.qty) ?
                                                    (
                                                        <FaTrash
                                                            className={styles.deleteBtnWhenQtyEqualsOne}
                                                            onClick={() => removeFromBag(item)}
                                                        />)
                                                    :
                                                    (
                                                        <HiMinusSm
                                                            className={styles.minus}
                                                            onClick={() => decreaseQty(item)}
                                                        />
                                                    )
                                                }
                                                <HiPlusSm
                                                    className={styles.plus}
                                                    onClick={() => handleIncreaseQty(item)}
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

                    <div data-aos="fade-in"
                         className={styles.containerBoxAmountDetails}
                    >
                        <div className={styles.totalAmountDetails}>
                            <p className={styles.subTotalText}>
                                {bag.totalBag} JD :السعر الإجمالي
                            </p>
                            <p className={styles.deliveryNote}>أجور التوصيل تضاف عند الطلب</p>
                        </div>
                    </div>
                    <div className={styles.containerBtns}>
                        <Link href="/">
                            <button className={styles.continueShoppingBtn}>
                                أكمل التسوق
                            </button>
                        </Link>
                        {token !== null ? (
                            <button
                                className={styles.checkoutBtn}
                                onClick={() => router.push("/payment/shipping-info")}
                            >
                                اطلب الآن
                            </button>
                        ) : (
                            <button
                                onClick={() => router.push("/account/checkout-login")}
                                className={styles.checkoutBtn}
                            >
                                اطلب الآن
                            </button>
                        )}
                    </div>
                </>
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
