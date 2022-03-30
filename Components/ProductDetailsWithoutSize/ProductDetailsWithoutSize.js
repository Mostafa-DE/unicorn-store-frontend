import styles from "@/components/ProductDetails/ProductDetails.module.css";
import "../../node_modules/animate.css/animate.css";
import {useContext, useState} from "react";
import Link from "next/link";
import {BagContext} from "@/context/BagContext";
import ImageMagnifier from "../ImageMagnifier/ImageMagnifier";
import {AiOutlineLine} from "react-icons/ai";
import {IoMdHeart, IoMdHeartEmpty} from "react-icons/io";
import RateStarIcons from "../RateStarIcons/RateStarIcons";
import {useRouter} from "next/router";
import {WishBagContext} from "@/context/WishBagContext";
import {CompareContext} from "@/context/CompareContext";
import {API_URL} from "@/config/index";
import Swal from "sweetalert2";
import {BiShareAlt} from "react-icons/bi";
import {GiScales} from "react-icons/gi";
import {HiCheckCircle} from "react-icons/hi";
import DialogSocialShare from "@/components/DialogSocialShare/DialogSocialShare";

export default function ProductDetails({product, token}) {
    const router = useRouter();

    // shopping bag context
    const {addToBag} = useContext(BagContext);
    // xxxxxxxxxxxxxxxxxxxx
    const AddToBag = async (product) => {
        await addToBag(product);
        router.push("/products/shopping-bag");
    };

    // wish bag context
    const {wishBag, addToWishBag} = useContext(WishBagContext);
    const {wishItems = []} = wishBag;
    // xxxxxxxxxxxxxxxxx

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
            if (token === null) return;
            addToWishBag(product);
            await Swal.fire({
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

    const [video, setvideo] = useState("");
    const [image, setImage] = useState(product.images[0].url);
    const handleChangeVideo = (url) => {
        setvideo(url);
        setImage("");
    };
    const handleChangeImage = (url) => {
        setImage(url);
        setvideo("");
    };

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <DialogSocialShare
                    shareDialog={shareDialog}
                    openShareDialog={openShareDialog}
                    closeShareDialog={closeShareDialog}
                    product={product}
                />
                <div className={styles.containerImages}>
                    <div className={styles.smallImagesProduct}>
                        {product.images?.map((image) => (
                            <img
                                key={image.id}
                                onClick={() => handleChangeImage(image.url)}
                                className={styles.smallImage}
                                src={image.url}
                            />
                        ))}
                        {product.videos?.map((video) => (
                            <img
                                key={video.id}
                                onClick={() => handleChangeVideo(video.url)}
                                className={styles.smallImage}
                                src={video.previewUrl}
                            />
                        ))}
                    </div>
                    {video !== "" ? (
                        <video className={styles.video}
                               controls
                        >
                            <source src={video}/>
                        </video>
                    ) : null}
                    {image !== "" ? (
                        <ImageMagnifier src={image}
                                        width={"100%"}
                                        height={"600px"}
                        />
                    ) : null}
                </div>

                <div className={styles.containerDetails}>
                    <div className={styles.containerRateAndWishList}>
                        <RateStarIcons/>
                        <div>
                            <BiShareAlt
                                onClick={openShareDialog}
                                className={styles.shareIcon}
                            />
                            <GiScales
                                onClick={() => addToCompare(product)}
                                className={styles.compareIcon}
                            />
                            <HiCheckCircle
                                className={
                                    productCompare?.isProductExist === true
                                        ? styles.checkIcon
                                        : styles.displayNone
                                }
                            />
                            {wishBagProduct?.isProductExist === true ? (
                                <IoMdHeart className={styles.heartIcon}/>
                            ) : (
                                <IoMdHeartEmpty
                                    onClick={
                                        token === null
                                            ? () => router.push("/account/login")
                                            : () => addToWishList(product)
                                    }
                                    className={styles.heartIcon}
                                />
                            )}
                        </div>
                    </div>

                    <div className={styles.containerTitle}>
                        <p className={styles.nameProduct}> {product.name} </p>
                        <AiOutlineLine className="lineIcon"/>
                    </div>

                    <div className={styles.containerPriceProduct}>
                        <p className={styles.priceProduct}> {product.price} JD :السعر </p>
                    </div>

                    <div className={styles.containerPriceProduct}>
                        <p className={styles.priceProduct}> اللون: أسود </p>
                    </div>

                    <div className={styles.containerDescription}>
                        <p className={styles.descriptionTitle}> -: الوصف</p>
                        <p className={styles.description}>{product.description}</p>
                    </div>
                    <div className={styles.containerAllBtns}>
                        <button
                            onClick={() => AddToBag(product)}
                            className={
                                product.isAvailable === true
                                    ? styles.addToBagBtn
                                    : styles.buttonDisabled
                            }
                        >
                            أضف إلى الحقيبة
                        </button>

                        {product.isAvailable === false && (
                            <p className={styles.notAvaliableText}>
                                نعتذر يبدو أن المنتج حالياً غير متوفر
                            </p>
                        )}
                        <Link href="/">
                            <button className={styles.continueShoppingBtn}>
                                أكمل التسوق
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
