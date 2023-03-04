import styles from "@/components/ProductItems/ProductItems.module.css";
import "../../node_modules/animate.css/animate.css";
import Link from "next/link";
import React, {useContext, useState} from "react";
import {AuthContext} from "@/context/AuthContext";
import {CompareContext} from "@/context/CompareContext";
import {WishBagContext} from "@/context/WishBagContext";
import {IoMdHeartEmpty, IoMdHeart} from "react-icons/io";
import {useRouter} from "next/router";
import {GiScales} from "react-icons/gi";
import {HiCheckCircle} from "react-icons/hi";
import {BiShareAlt} from "react-icons/bi";
import DialogSocialShare from "@/components/DialogSocialShare";
import {IProduct} from "@/Models/types";
import {calculateDiscountPrice} from "@/helpers/calculateDiscountPrice";
import Image from "next/image";


type ProductDoesNotExist = { error: string }

interface IProductItemsProps {
    product: IProduct & ProductDoesNotExist;
    pathname?: string;
}

const ProductItems: React.FC<IProductItemsProps> = ({product}) => {
    console.log(product)
    const router = useRouter();

    const {user} = useContext(AuthContext);

    //TODO: add right types here
    // @ts-ignore
    const {wishBag, addToWishBag} = useContext(WishBagContext);
    const {wishItems = []} = wishBag;

    const {
        name,
        price,
        images = [],
        discount_percentage,
        slug
    } = product

    if (images.length === 0) images.push({id: "Default", url: "/images/unicorn.png"});

    // const addToWishList = async (product: IProduct) => {
    //   try {
    //     await fetch(`${API_URL}/wishes`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify({
    //         name: `${product.name}`,
    //         price: `${product.price}`,
    //         image: `${product.images[0]?.id}`,
    //         slug: `${product.slug}`,
    //         productDetailsPage: `/${product.productDetailsPage}/${product.slug}`,
    //         IdProductExist: `${product.id}`,
    //         qty: product.qty || 1,
    //       }),
    //     });
    //     addToWishBag(product);
    //     Swal.fire({
    //       title: "تم إضافة المنتج إلى قائمة المفضلة لديك",
    //       icon: "success",
    //       confirmButtonColor: "#fb9aa7",
    //       confirmButtonText: "حسناً",
    //       showClass: {
    //         popup: "animate__animated animate__fadeInDown",
    //       },
    //       hideClass: {
    //         popup: "animate__animated animate__fadeOutUp",
    //       },
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    //TODO: add right types here
    // @ts-ignore
    const {productsCompare, addToCompare} = useContext(CompareContext);
    const {compareItems = []} = productsCompare;

    // check or hide wish icon
    const wishBagProduct = wishItems.find(
        (element: IProduct) =>
            // @ts-ignore
            `${element.productDetailsPage}/${element.slug}` ===
            // @ts-ignore
            `${product.productDetailsPage}/${product.slug}`
    );

    // hide or show check icon on compare product
    const productCompare = compareItems.find(
        (element: IProduct) =>
            // @ts-ignore
            `${element.productDetailsPage}/${element.slug}` ===
            // @ts-ignore
            `${product.productDetailsPage}/${product.slug}`
    );

    const [shareDialog, setShareDialog] = useState(false);
    const openShareDialog = () => {
        setShareDialog(true);
    };

    const closeShareDialog = () => {
        setShareDialog(false);
    };

    return (
        <div data-aos="fade-right" data-aos-once='true' className={styles.container}>
            {/*<img className={styles.imgs} src={product.images[0]?.url} />*/}
            <Image alt="productImg" src={images[0].url} width={300} height={400}/>
            <DialogSocialShare
                shareDialog={shareDialog}
                closeShareDialog={closeShareDialog}
                product={product}
            />
            <div className={styles.overlay}>
                <div>
                    <div className={styles.containerIcons}>
                        <div>
                            {wishBagProduct?.isProductExist === true ? (
                                <IoMdHeart className={styles.wishIconFilled}/>
                            ) : (
                                <IoMdHeartEmpty
                                    // onClick={
                                    //   user === null
                                    //     ? () => router.push("/account/login")
                                    //     : () => addToWishList(product)
                                    // }
                                    className={styles.wishIconOutline}
                                />
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
                        <BiShareAlt
                            onClick={openShareDialog}
                            className={styles.shareIcon}
                        />
                    </div>
                </div>
                <div className={styles.head}>
                    <p className={styles.nameText}>{name}</p>
                    {product.discount_percentage !== 0 && (
                        <p className={styles.saveText}>Save {discount_percentage}%</p>
                    )}
                    <hr className={styles.hr}/>
                </div>
                <div className={styles.price}>
                    {product.discount_percentage !== 0 && (
                        <p className={styles.oldPrice}>{price} JD</p>
                    )}
                    <p className={styles.newPrice}>{calculateDiscountPrice(price, discount_percentage)} JD</p>
                </div>
                <div className={styles.quickview}>
                    <Link href={`/${router.pathname}/${slug}`} passHref={true}>
                        <button className={styles.quickviewBtn}>
                            اطلب الآن / التفاصيل
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductItems;
