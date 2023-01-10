import styles from "@/components/ProductDetails/ProductDetails.module.css";
import "../../node_modules/animate.css/animate.css";
import {useContext, useState, useEffect} from "react";
import Link from "next/link";
import {BagContext} from "@/context/BagContext";
import ImageMagnifier from "../ImageMagnifier/ImageMagnifier";
import {AiOutlineLine} from "react-icons/ai";
import {IoMdHeartEmpty, IoMdHeart} from "react-icons/io";
import {BiShareAlt} from "react-icons/bi";
import {HiCheckCircle} from "react-icons/hi";
import {GiScales} from "react-icons/gi";
import RateStarIcons from "../RateStarIcons/RateStarIcons";
import {useRouter} from "next/router";
import TextField from "@mui/material/TextField";
import {WishBagContext} from "@/context/WishBagContext";
import {CompareContext} from "@/context/CompareContext";
import DialogSocialShare from "@/components/DialogSocialShare/DialogSocialShare";
import Popover from "@/components/PopOver";
import Box from "@mui/material/Box";
import Reviews from "@/components/Reviews";
import {pagesWithoutSize} from "./urlsPagesWithoutSize";
import {
    AlertSizeNotExist,
    AlertErrorSize,
} from "@/components/ProductDetails/helpers";
import {addProductToWishList} from "@/helpers/AlertsAndDialogs/addProductToWishList";

export default function ProductDetails({product, token, reviews}) {
    const router = useRouter();
    //TODO: add right types here
    // @ts-ignore
    const {addToBag} = useContext(BagContext);
    //TODO: add right types here
    // @ts-ignore
    const {wishBag, addToWishBag} = useContext(WishBagContext);
    const {wishItems = []} = wishBag;
    //TODO: add right types here
    // @ts-ignore
    const {productsCompare, addToCompare} = useContext(CompareContext);
    const {compareItems = []} = productsCompare;

    const [shareDialog, setShareDialog] = useState(false);
    const [video, setvideo] = useState("");
    const [image, setImage] = useState(product.images[0]?.url);
    const [length, setLength] = useState();
    const [weight, setWeight] = useState();
    const [size, setSize] = useState("");
    const openShareDialog = () => {
        setShareDialog(true);
    };
    const closeShareDialog = () => {
        setShareDialog(false);
    };
    const handleChangeVideo = (url) => {
        setvideo(url);
        setImage("");
    };
    const handleChangeImage = (url) => {
        setImage(url);
        setvideo("");
    };
    const handleChangeLength = (evnt) => {
        setLength(evnt.target.value);
    };
    const handleChangeWeight = (evnt) => {
        setWeight(evnt.target.value);
    };

    // check or hide wish icon
    const wishBagProduct = wishItems.find(
        (element) =>
            `${element.productDetailsPage}/${element.slug}` ===
            `${product.productDetailsPage}/${product.slug}`
    );

    // hide or show check icon on compare product
    const productCompare = compareItems.find(
        (element) =>
            `${element.productDetailsPage}/${element.slug}` ===
            `${product.productDetailsPage}/${product.slug}`
    );

    const AddToBag = async (product) => {
        await addToBag(product, size);
        await router.push("/products/shopping-bag");
    };

    const commonSize = {
        //TODO: add right types here
        // @ts-ignore
        small: weight >= 40 && weight <= 50,
        //TODO: add right types here
        // @ts-ignore
        medium: weight >= 51 && weight <= 57,
        //TODO: add right types here
        // @ts-ignore
        large: weight >= 58 && weight <= 64,
        //TODO: add right types here
        // @ts-ignore
        xLarge: weight >= 65 && weight <= 75,
    };
    const sizeForShortPerson = {
        //TODO: add right types here
        // @ts-ignore
        medium: weight >= 40 && weight <= 50,
        //TODO: add right types here
        // @ts-ignore
        large: weight >= 51 && weight <= 57,
        //TODO: add right types here
        // @ts-ignore
        xLarge: weight >= 58 && weight <= 64,
        //TODO: add right types here
        // @ts-ignore
        xxLarge: weight >= 65 && weight <= 75,
        //TODO: add right types here
        // @ts-ignore
        xxxLarge: weight >= 76,
    };
    const determineBestSize = () => {
        const {small, medium, large, xLarge} = commonSize;
        //TODO: add right types here
        // @ts-ignore
        if (length >= 158 && length <= 165) {
            if (small) return setSize("S");
            if (medium) return setSize("M");
            if (large) return setSize("L");
            if (xLarge) return setSize("XL");
            //TODO: add right types here
            // @ts-ignore
            if (weight >= 76 && weight <= 80) return setSize("2XL");
            //TODO: add right types here
            // @ts-ignore
            if (weight >= 81) return setSize("3XL");
        }

        //TODO: add right types here
        // @ts-ignore
        if (length > 165) {
            if (small) return setSize("S");
            if (medium) return setSize("M");
            if (large) return setSize("L");
            if (xLarge) return setSize("XL");
            //TODO: add right types here
            // @ts-ignore
            if (weight >= 76) return setSize("2XL");
        }

        //TODO: add right types here
        // @ts-ignore
        if (length < 158) {
            const {medium, large, xLarge, xxLarge, xxxLarge} = sizeForShortPerson;
            if (medium) return setSize("M");
            if (large) return setSize("L");
            if (xLarge) return setSize("XL");
            if (xxLarge) return setSize("2XL");
            if (xxxLarge) return setSize("3XL");
        }
        setSize("");
    };

    // logic to determine the best size for user
    useEffect(() => {
        if (length === "" || length < 50 || length > 172) return setSize("");
        determineBestSize();
    }, [length, weight, size]);

    // hide size section in some pages
    const hideSizeSection = () => {
        for (let pageUrl of pagesWithoutSize) {
            if (pageUrl === router.pathname) return true;
        }
        return false;
    };

    const getColorProduct = (product) => {
        return product.color
            .split("-")
            .map((color) => (
                <div
                    style={{backgroundColor: `${color}`}}
                    className={styles.colorProduct}
                />
            ));
    };

    return (
        <Box data-aos="fade-in" className={styles.main}>
            <Box className={styles.container}>
                <DialogSocialShare
                    shareDialog={shareDialog}
                    //TODO: add right types here
                    // @ts-ignore
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
                        <video controlsList="nodownload" className={styles.video} controls>
                            <source src={video}/>
                        </video>
                    ) : null}
                    {image !== "" ? (
                        <ImageMagnifier src={image} width={"100%"} height={"600px"}/>
                    ) : null}
                </div>

                <Box className={styles.containerDetails}>
                    <Box className={styles.containerRateAndWishList}>
                        <RateStarIcons/>
                        <Box display="flex">
                            <Popover
                                text="Share This Product"
                                icon={
                                    <BiShareAlt
                                        onClick={openShareDialog}
                                        className={styles.shareIcon}
                                    />
                                }
                            />
                            <Popover
                                text="Add This Product To Compare products"
                                icon={
                                    <GiScales
                                        onClick={() => addToCompare(product)}
                                        className={styles.compareIcon}
                                    />
                                }
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
                                <Popover
                                    text="Add This Product To Wish List"
                                    icon={
                                        <IoMdHeartEmpty
                                            onClick={
                                                token === null
                                                    ? () => router.push("/account/login")
                                                    : () =>
                                                        addProductToWishList(product, token, addToWishBag)
                                            }
                                            className={styles.heartIcon}
                                        />
                                    }
                                />
                            )}
                        </Box>
                    </Box>

                    <Box className={styles.containerTitle}>
                        <p className={styles.nameProduct}> {product.name} </p>
                        <AiOutlineLine className="lineIcon"/>
                    </Box>

                    {/* Discount percentage */}
                    {product.discount && (
                        <Box>
                            <p className={styles.discountPriceProduct}>
                                {" "}
                                Save {product.discount}%{" "}
                            </p>
                            <hr style={{width: "21%", margin: "0 0 1rem 0"}}/>
                        </Box>
                    )}

                    {/* price section */}
                    <Box className={styles.containerPriceProduct}>
                        <p className={styles.priceProduct}> {product.price} JD </p>
                        {product.oldPrice && (
                            <p className={styles.oldPriceProduct}> {product.oldPrice} JD </p>
                        )}
                    </Box>

                    {/* color section */}
                    {product.color && (
                        <Box className={styles.containerColorProduct}>
                            {getColorProduct(product)}
                        </Box>
                    )}

                    {/* pre-order message */}
                    {product.preOrder === true && (
                        <Box className={styles.preOrderText}>
                            <span>: ملاحظة</span>
                            <p>
                                يرجى العلم أن المنتج متوفر فقط عند الطلب المسبق, مع العلم أن بعض
                                المنتجات قد تستغرق وقت لحين الشحن قد تستمر إلى أسابيع, لذا عند
                                الطلب احتفظ برقم الطلب لكي تستطيع الاستفسار عنه بسهولة في وقت
                                لاحق
                            </p>
                        </Box>
                    )}

                    {/* size input */}
                    {product.isAvailable && !hideSizeSection() && (
                        <>
                            <Box className={styles.containerTitleText}>
                                <p className={styles.titleText}>
                                    يرجى إدخال الطول و الوزن لتحديد القياس المناسب لك
                                </p>
                            </Box>
                            <Box className={styles.containerInputLengthAndWeight}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="(الطول (سم"
                                    variant="standard"
                                    value={length}
                                    onChange={handleChangeLength}
                                />
                                <TextField
                                    type="number"
                                    label="(الوزن (كغ"
                                    variant="standard"
                                    value={weight}
                                    onChange={handleChangeWeight}
                                    style={{margin: "0 1rem 0 1rem"}}
                                    fullWidth
                                />
                                <TextField
                                    type="text"
                                    label="القياس"
                                    variant="standard"
                                    value={size}
                                    //TODO: add right types here
                                    // @ts-ignore
                                    readOnly
                                    fullWidth
                                />
                            </Box>
                        </>
                    )}

                    {/* error message when size not available */}
                    <Box>
                        {size === "S" && product.S !== true && AlertSizeNotExist}
                        {size === "M" && product.M !== true && AlertSizeNotExist}
                        {size === "L" && product.L !== true && AlertSizeNotExist}
                        {size === "XL" && product.XL !== true && AlertSizeNotExist}
                        {size === "2XL" && product.XXL !== true && AlertSizeNotExist}
                        {size === "3XL" && product.XXXL !== true && AlertSizeNotExist}
                    </Box>

                    {/* reminder for the users if the size not fit */}
                    {size !== "" && (
                        <Box>
                            <p className={styles.sizeNotFitText}>
                                إذا كنت تعتقد أن القياس لا يناسبك يرجى ترك ملاحظة عند الطلب
                                وسنتواصل معك بأسرع وقت ممكن
                            </p>
                        </Box>
                    )}

                    {/* Btns section */}
                    <Box className={styles.containerAllBtns}>
                        <button
                            onClick={
                                size === "" && !hideSizeSection()
                                    ? () => AlertErrorSize()
                                    : () => AddToBag(product)
                            }
                            className={
                                product.isAvailable === true
                                    ? styles.addToBagBtn
                                    : styles.buttonDisabled
                            }
                        >
                            {product.preOrder === false
                                ? "أضف إلى الحقيبة"
                                : "متوفر للطلب المسبق"}
                        </button>

                        {product.isAvailable === false && (
                            <p className={styles.notAvaliableText}>
                                نعتذر يبدو أن المنتج حالياً غير متوفر
                            </p>
                        )}

                        <Link href="/" className={styles.continueShoppingBtn}>
                            أكمل التسوق
                        </Link>
                    </Box>
                </Box>
            </Box>

            {/* Reviews Section */}
            <Reviews product={product} reviews={reviews} token={token}/>
        </Box>
    );
}
