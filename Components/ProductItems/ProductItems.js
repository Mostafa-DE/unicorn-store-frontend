import styles from "@/components/ProductItems/ProductItems.module.css";
import "../../node_modules/animate.css/animate.css";
import Link from "next/link";
import {useContext, useState} from "react";
import {AuthContext} from "@/context/AuthContext";
import {CompareContext} from "@/context/CompareContext";
import {WishBagContext} from "@/context/WishBagContext";
import {IoMdHeartEmpty, IoMdHeart} from "react-icons/io";
import {useRouter} from "next/router";
import {GiScales} from "react-icons/gi";
import {HiCheckCircle} from "react-icons/hi";
import {BiShareAlt} from "react-icons/bi"
import {API_URL} from "@/config/index";
import Swal from "sweetalert2";
import DialogSocialShare from "@/components/DialogSocialShare"

export default function ProductItems({product, token}) {
    const router = useRouter();

    // Auth Context
    const {user} = useContext(AuthContext);
    // xxxxxxxxxxxx

    // wish bag context
    const {wishBag, addToWishBag} = useContext(WishBagContext);
    const {wishItems = []} = wishBag;
    // xxxxxxxxxxxxxxxxx

    const addToWishList = async product => {
        try {
            await fetch(`${API_URL}/wishes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: `${product.name}`,
                    price: `${product.price}`,
                    image: `${product.images[0].id}`,
                    slug: `${product.slug}`,
                    productDetailsPage: `/${product.productDetailsPage}/${product.slug}`,
                    IdProductExist: `${product.id}`,
                    qty: product.qty || 1
                })
            });
            addToWishBag(product);
            Swal.fire({
                title: "تم إضافة المنتج إلى قائمة المفضلة لديك",
                icon: "success",
                confirmButtonColor: "#fb9aa7",
                confirmButtonText: "حسناً",
                showClass: {
                    popup: "animate__animated animate__fadeInDown"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    // Compare Context
    const {productsCompare, addToCompare} = useContext(CompareContext);
    const {compareItems = []} = productsCompare;
    // xxxxxxxxxxxxxxxx

    const wishBagProduct = wishItems.find(element => element.id === product.id);

    const productCompare = compareItems.find(
        element => element.slug === product.slug
    );

    // state for share social dialog
    const [shareDialog, setShareDialog] = useState(false)
    const openShareDialog = () => {
        setShareDialog(true)
    }

    const closeShareDialog = () => {
        setShareDialog(false)
    }

    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    return (
        <div data-aos="fade-right"
             className={styles.container}
        >
            <img className={styles.imgs}
                 src={product.images[0]?.url}
            />
            <DialogSocialShare
                shareDialog={shareDialog}
                openShareDialog={openShareDialog}
                closeShareDialog={closeShareDialog}
                product={product}
            />
            <div className={styles.overlay}>
                <div>
                    <div className={styles.containerIcons}>
                        <div
                            onClick={
                                user === null
                                    ? () => router.push("/account/login")
                                    : () => addToWishList(product)
                            }
                        >
                            {wishBagProduct?.isProductExist === true ? (
                                <IoMdHeart className={styles.wishIconFilled}/>
                            ) : (
                                <IoMdHeartEmpty className={styles.wishIconOutline}/>
                            )}
                        </div>
                        <HiCheckCircle
                            className={
                                productCompare?.isProductExist === true
                                    ? styles.checkIcon
                                    : styles.displayNone
                            }
                        />
                        <GiScales
                            onClick={() => addToCompare(product)}
                            className={styles.compareProductsIcon}
                        />
                        <BiShareAlt onClick={openShareDialog}
                                    className={styles.shareIcon}
                        />
                    </div>
                </div>
                <div className={styles.head}>
                    <p className={styles.nameText}>{product.name}</p>
                    {product.discount && (
                        <p className={styles.saveText}>Save {product.discount}%</p>
                    )}
                    <hr className={styles.hr}/>
                </div>
                <div className={styles.price}>
                    {product.oldPrice && (
                        <p className={styles.oldPrice}>{product.oldPrice} JD</p>
                    )}
                    <p className={styles.newPrice}>{product.price} JD</p>
                </div>
                <div className={styles.quickview}>
                    <Link href={`/${product.productDetailsPage}/${product.slug}`}>
                        <button className={styles.quickviewBtn}>
                            اطلب الآن / التفاصيل
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
