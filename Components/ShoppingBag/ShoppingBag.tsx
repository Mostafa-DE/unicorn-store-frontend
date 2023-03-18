import styles from "@/components/ShoppingBag/ShoppingBag.module.css";
import React, {useContext, useState} from "react";
import {AuthContext} from "@/context/AuthContext";
import {MessageContext} from "@/context/MessageContext";
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
import {API_URL} from "@/config/index";
import Image from "next/image";

export default function ShoppingBag({bag}) {
    const router = useRouter();
    const [cartItems, setCartItems] = useState(bag.cart_items);
    const [totalBag, setTotalBag] = useState(bag.cart_total);

    const {growl} = useContext(MessageContext);

    async function handleChangeQty(lineId, qty) {
        const res = await fetch(`${API_URL}/api/cart/item/${lineId}/`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({qty}),
        })
        if (!res.ok) {
            growl({
                text: "Something went wrong while updating the line, please try again later!!",
                severity: "error"
            })
            return;
        }
        const line = await res.json();
        setCartItems(prevState => {
            const index = prevState.findIndex(item => item.id === lineId);
            prevState[index] = line;
            return [...prevState];
        });
        setTotalBag(line.cart_total)
    }

    async function handleDeleteLine(lineId) {
        const res = await fetch(`${API_URL}/api/cart/item/${lineId}/`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (!res.ok) {
            growl({
                text: "Something went wrong while deleting the line, please try again later!!",
                severity: "error"
            })
            return;
        }
        setCartItems(cartItems.filter(item => item.id !== lineId));
        growl({
            text: "The line was deleted successfully!!",
            severity: "success"
        })
    }

    const {user} = useContext(AuthContext);

    return (
        <div className={styles.main}>
            <div data-aos="fade-in" data-aos-once='true' className="containerTitle">
                <h1 className="h1Title"> حقيبة التسوق </h1>
                <AiOutlineLine className="lineIcon"/>
            </div>
            {cartItems.length !== 0 ? (
                <>
                    <TableContainer style={{margin: "3.5rem 0 0 0"}}>
                        <Table data-aos="fade-in" data-aos-once='true'>
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
                                {cartItems.map(({product, quantity, id, size, color, images}) => (
                                    <TableRow key={id}>
                                        <TableCell
                                            sx={{width: "23rem"}}
                                            className={styles.fontFamily}
                                        >
                                            <div className={styles.containerItemCell}>
                                                <Image
                                                    src={
                                                        (
                                                            product.images
                                                            && product.images.length !== 0
                                                        ) ? product.images[0].url : ""
                                                    }
                                                    width={250}
                                                    height={100}
                                                    style={{maxWidth: "100px"}}
                                                    alt="Item Image.."
                                                />
                                                <div className={styles.itemDetails}>
                                                    <p className={styles.nameItem}>{product.name}</p>
                                                    {color && (
                                                        <p className={styles.colorItem}
                                                           style={{backgroundColor: `${color}`}}>
                                                        </p>
                                                    )}
                                                    {size && (
                                                        <p className={styles.sizeItem}>
                                                            {size}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className={styles.priceItem}>{product.price} JD</TableCell>
                                        <TableCell align="center">
                                            {quantity}
                                            <div className={styles.addOrRemoveQty}>
                                                {quantity === 1 ? (
                                                    <FaTrash
                                                        className={styles.deleteBtnWhenQtyEqualsOne}
                                                        onClick={() => handleDeleteLine(id)}
                                                    />
                                                ) : (
                                                    <HiMinusSm
                                                        className={styles.minus}
                                                        onClick={() => handleChangeQty(id, quantity - 1)}
                                                    />
                                                )}
                                                <HiPlusSm
                                                    className={styles.plus}
                                                    onClick={() => handleChangeQty(id, quantity + 1)}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className={styles.totalPriceItem} align="center">
                                            {product.price * quantity} JD
                                        </TableCell>
                                        <TableCell>
                                            <FaTrash
                                                className={styles.deleteBtn}
                                                onClick={() => handleDeleteLine(id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div data-aos="fade-in" data-aos-once='true' className={styles.containerBoxAmountDetails}>
                        <div className={styles.totalAmountDetails}>
                            <p className={styles.subTotalText}>
                                {totalBag} JD :السعر الإجمالي
                            </p>
                        </div>
                    </div>
                    <div className={styles.containerBtns}>
                        <Link href="/">
                            <button className={styles.continueShoppingBtn}>
                                أكمل التسوق
                            </button>
                        </Link>
                        <button
                            className={styles.checkoutBtn}
                            onClick={
                                user ?
                                    () => router.push("/payment/shipping-info")
                                    :
                                    () => router.push("/account/checkout-login")
                            }
                        >
                            اطلب الآن
                        </button>
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
