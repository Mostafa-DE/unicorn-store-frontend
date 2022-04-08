import styles from "@/components/ProductDetails/ProductDetails.module.css";
import "../../node_modules/animate.css/animate.css";
import {useContext, useState, useEffect} from "react";
import Link from "next/link";
import {BagContext} from "@/context/BagContext";
import ImageMagnifier from "../ImageMagnifier/ImageMagnifier";
import {AiOutlineLine} from "react-icons/ai";
import {IoMdHeartEmpty, IoMdHeart} from "react-icons/io";
import {ImWhatsapp} from "react-icons/im";
import {BiShareAlt} from "react-icons/bi"
import {HiCheckCircle} from "react-icons/hi"
import {GiScales} from "react-icons/gi";
import RateStarIcons from "../RateStarIcons/RateStarIcons";
import {useRouter} from "next/router";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import {WishBagContext} from "@/context/WishBagContext";
import {API_URL} from "@/config/index";
import {CompareContext} from "@/context/CompareContext";
import DialogSocialShare from "@/components/DialogSocialShare/DialogSocialShare";
import Popover from "@/components/PopOver";
import Box from "@mui/material/Box";
import Reviews from "@/components/Reviews";
import {pagesWithoutSize} from "./urlsPagesWithoutSize"

export default function ProductDetails({product, token, reviews}) {
    const router = useRouter();

    // shopping bag context
    const {addToBag} = useContext(BagContext);
    // xxxxxxxxxxxxxxxxxxxx

    // wish bag context
    const {wishBag, addToWishBag} = useContext(WishBagContext);
    const {wishItems = []} = wishBag;
    // xxxxxxxxxxxxxxxxx

    // Compare Context
    const {productsCompare, addToCompare} = useContext(CompareContext);
    const {compareItems = []} = productsCompare;
    // xxxxxxxxxxxxxxxx

    // check or hide wish icon
    const wishBagProduct = wishItems.find(
        element =>
            `${element.productDetailsPage}/${element.slug}` === `${product.productDetailsPage}/${product.slug}`
    )

    // hide or show check icon on compare product
    const productCompare = compareItems.find(
        element =>
            `${element.productDetailsPage}/${element.slug}` === `${product.productDetailsPage}/${product.slug}`
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

    const AddToBag = async product => {
        await addToBag(product, size);
        await router.push("/products/shopping-bag");
    };

    const [video, setvideo] = useState("");
    const [image, setImage] = useState(product.images[0].url);
    const handleChangeVideo = url => {
        setvideo(url);
        setImage("");
    };
    const handleChangeImage = url => {
        setImage(url);
        setvideo("");
    };

    // state for chose right size
    const [length, setLength] = useState();
    const handleChangeLength = evnt => {
        setLength(evnt.target.value);
    };

    const [weight, setWeight] = useState();
    const handleChangeWeight = evnt => {
        setWeight(evnt.target.value);
    };


    // logic for detect the best size for user
    const [size, setSize] = useState("");
    useEffect(() => {
            if (length === "" || length < 50 || length > 172) {
                setSize("");
                return;
            }

            if (length >= 158 && length <= 165) {
                if (weight >= 40 && weight <= 50) {
                    setSize("S");
                } else if (weight >= 51 && weight <= 57) {
                    setSize("M");
                } else if (weight >= 58 && weight <= 64) {
                    setSize("L");
                } else if (weight >= 65 && weight <= 75) {
                    setSize("XL");
                } else if (weight >= 76 && weight <= 80) {
                    setSize("2XL");
                } else if (weight >= 81) {
                    setSize("3XL");
                } else {
                    setSize("");
                }
            } else if (length > 165) {
                if (weight >= 40 && weight <= 50) {
                    setSize("S");
                } else if (weight >= 51 && weight <= 57) {
                    setSize("M");
                } else if (weight >= 58 && weight <= 64) {
                    setSize("L");
                } else if (weight >= 65 && weight <= 75) {
                    setSize("XL");
                } else if (weight >= 76) {
                    setSize("2XL");
                } else {
                    setSize("");
                }
            } else if (length < 158) {
                if (weight >= 40 && weight <= 50) {
                    setSize("M");
                } else if (weight >= 51 && weight <= 57) {
                    setSize("L");
                } else if (weight >= 58 && weight <= 64) {
                    setSize("XL");
                } else if (weight >= 65 && weight <= 75) {
                    setSize("2XL");
                } else if (weight >= 76) {
                    setSize("3XL");
                } else {
                    setSize("");
                }
            }
        }
        ,
        [length, weight, size]
    );
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    const SizeNotExist = (
        <>
            <p className={styles.sizeNotExistText}>
                نعتذر يبدو أن القياس المطلوب غير متوفر حالياً لمعرفة إن كان سيتوفر بعد
                مدة معينة يرجى مراسلتنا عبر{" "}
                <a href="https://wa.me/message/HRQFZDWSM3EUH1">
                    <ImWhatsapp/>
                </a>
            </p>
        </>
    );

    // hide size section in some pages
    const hideSizeSection = () => {
        for (let pageUrl of pagesWithoutSize) {
            if (pageUrl === router.pathname) return true
        }
        return false
    }


    const alertErrorSize = () => {
        Swal.fire({
            title: "نعتذر لا يمكن تنفيذ طلبك",
            text:
                " لا تستطيع إضافة المنتج إلى حقيبة التسوق الخاصة بك, يجب عليك إدخال الطول والوزن لتحديد القياس المناسب لك أولاً",
            icon: "error",
            confirmButtonColor: "#fb9aa7",
            confirmButtonText: "حسناً",
            showClass: {
                popup: "animate__animated animate__flipInX"
            },
            hideClass: {
                popup: "animate__animated animate__flipOutX"
            }
        });
    };

    return (
        <Box data-aos="fade-in"
             className={styles.main}
        >
            <Box className={styles.container}>
                <DialogSocialShare
                    shareDialog={shareDialog}
                    openShareDialog={openShareDialog}
                    closeShareDialog={closeShareDialog}
                    product={product}
                />
                <div className={styles.containerImages}>
                    <div className={styles.smallImagesProduct}>
                        {product.images?.map(image => (
                            <img
                                key={image.id}
                                onClick={() => handleChangeImage(image.url)}
                                className={styles.smallImage}
                                src={image.url}
                            />
                        ))}
                        {product.videos?.map(video => (
                            <img
                                key={video.id}
                                onClick={() => handleChangeVideo(video.url)}
                                className={styles.smallImage}
                                src={video.previewUrl}
                            />
                        ))}
                    </div>
                    {video !== "" ? (
                        <video
                            controlsList="nodownload"
                            className={styles.video}
                            controls
                        >
                            <source src={video}/>
                        </video>
                    ) : null}
                    {image !== "" ? (
                        <ImageMagnifier
                            src={image}
                            width={"100%"}
                            height={"600px"}
                        />
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
                                                    : () => addToWishList(product)
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

                    {/* price section */}
                    <Box className={styles.containerPriceProduct}>
                        <p className={styles.priceProduct}> {product.price} JD :السعر </p>
                    </Box>

                    {/* color section */}
                    <Box className={styles.containerPriceProduct}>
                        {product.color && (
                            <p className={styles.priceProduct}>اللون: {product.color} </p>
                        )}
                    </Box>

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
                                    readOnly
                                    fullWidth
                                />
                            </Box>
                        </>
                    )}

                    {/* error message when size not available */}
                    <Box>
                        {size === "S" && product.S !== true && SizeNotExist}
                        {size === "M" && product.M !== true && SizeNotExist}
                        {size === "L" && product.L !== true && SizeNotExist}
                        {size === "XL" && product.XL !== true && SizeNotExist}
                        {size === "2XL" && product.XXL !== true && SizeNotExist}
                        {size === "3XL" && product.XXXL !== true && SizeNotExist}
                    </Box>
                    <Box>
                        {size !== "" && (
                            <p className={styles.sizeNotFitText}>
                                إذا كنت تعتقد أن القياس لا يناسبك يرجى ترك ملاحظة عند الطلب
                                وسنتواصل معك بأسرع وقت ممكن
                            </p>
                        )}
                    </Box>
                    {/* xxxxxxxxxxxxxxxx */}

                    <Box className={styles.containerAllBtns}>
                        <button
                            onClick={
                                (size === "" && !hideSizeSection()) ? () => alertErrorSize() : () => AddToBag(product)
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

                        <Link href="/">
                            <button className={styles.continueShoppingBtn}>
                                أكمل التسوق
                            </button>
                        </Link>
                    </Box>
                </Box>
            </Box>

            {/* Reviews Section */}
            <Reviews product={product}
                     reviews={reviews}
                     token={token}
            />
        </Box>
    );
}
