import styles from "@/components/ProductDetails/ProductDetails.module.css";
import "../../node_modules/animate.css/animate.css";
import {useContext, useState, useEffect} from "react";
import Link from "next/link";
import {BagContext} from "@/context/BagContext";
import ImageMagnifier from "../ImageMagnifier/ImageMagnifier";
import {AiOutlineLine} from "react-icons/ai";
import {IoMdHeartEmpty} from "react-icons/io";
import {ImWhatsapp} from "react-icons/im";
import RateStarIcons from "../RateStarIcons/RateStarIcons";
import {useRouter} from "next/router";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

export default function ProductDetails({product}) {
    const router = useRouter();

    // shopping bag context
    const {addToBag} = useContext(BagContext);

    // xxxxxxxxxxxxxxxxxxxx
    const AddToBag = async product => {
        await addToBag(product, size);
        router.push("/products/shopping-bag");
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
        if (length !== "") {
            if (length >= 158 && length <= 165) {
                if (weight <= 50 && weight > 0) {
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
                if (weight <= 50 && weight > 0) {
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
            } else if (length < 158) {
                if (weight <= 57 && weight > 0) {
                    setSize("S");
                } else if (weight >= 58 && weight <= 64) {
                    setSize("M");
                } else if (weight >= 65 && weight <= 75) {
                    setSize("L");
                } else if (weight >= 76 && weight <= 80) {
                    setSize("XL");
                } else if (weight >= 81) {
                    setSize("2XL");
                } else {
                    setSize("");
                }
            }
        } else {
            setSize("")
        }

    }, [length, weight]);
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    const SizeNotExist = (
        <>
            <p className={styles.sizeNotExistText}>
                نعتذر يبدو أن القياس المطلوب غير متوفر حالياً لمعرفة إن كان سيتوفر بعد
                مدة معينة يرجى مراسلتنا عبر{" "}
                <a href="https://wa.me/message/HRQFZDWSM3EUH1">
                    <ImWhatsapp/> الواتس
                </a>
            </p>
        </>
    );

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
        <div data-aos="fade-in"
             className={styles.main}
        >
            <div className={styles.container}>
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
                        <IoMdHeartEmpty className={styles.heartIcon}/>
                    </div>

                    <div className={styles.containerTitle}>
                        <p className={styles.nameProduct}> {product.name} </p>
                        <AiOutlineLine className="lineIcon"/>
                    </div>

                    <div className={styles.containerPriceProduct}>
                        <p className={styles.priceProduct}> {product.price} JD :السعر </p>
                    </div>

                    <div className={styles.containerPriceProduct}>
                        {product.color && (
                            <p className={styles.priceProduct}>اللون: {product.color} </p>
                        )}
                    </div>

                    {product.preOrder === true && (
                        <div className={styles.preOrderText}>
                            <p>
                                يرجى العلم أن المنتج متوفر فقط عند الطلب المسبق, مع العلم أن بعض
                                المنتجات قد تستغرق وقت لحين الشحن قد تستمر إلى أسابيع, لذا عند
                                الطلب احتفظ برقم الطلب لكي تستطيع الاستفسار عنه بسهولة في وقت
                                لاحق
                            </p>
                        </div>
                    )}

                    {/* size input */}
                    {product.isAvailable === true && (
                        <>
                            <div className={styles.containerTitleText}>
                                <p className={styles.titleText}>
                                    يرجى إدخال الطول و الوزن لتحديد القياس المناسب لك
                                </p>
                            </div>
                            <div className={styles.containerInputLengthAndWeight}>
                                <TextField
                                    type="text"
                                    label="القياس"
                                    variant="standard"
                                    value={size}
                                    readOnly
                                    fullWidth
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
                                    fullWidth
                                    type="number"
                                    label="(الطول (سم"
                                    variant="standard"
                                    value={length}
                                    onChange={handleChangeLength}
                                />
                            </div>
                        </>
                    )}

                    <div>
                        {size === "S" && product.S !== true && SizeNotExist}
                        {size === "M" && product.M !== true && SizeNotExist}
                        {size === "L" && product.L !== true && SizeNotExist}
                        {size === "XL" && product.XL !== true && SizeNotExist}
                        {size === "2XL" && product.XXL !== true && SizeNotExist}
                        {size === "3XL" && product.XXXL !== true && SizeNotExist}
                    </div>
                    <div>
                        {size !== "" && (
                            <p className={styles.sizeNotFitText}>
                                إذا كنت تعتقد أن القياس لا يناسبك يرجى ترك ملاحظة عند الطلب
                                وسنتواصل معك بأسرع وقت ممكن
                            </p>
                        )}
                    </div>
                    {/* xxxxxxxxxx */}

                    <div className={styles.containerDescription}>
                        {product.description && (
                            <p className={styles.descriptionTitle}> -: الوصف</p>
                        )}

                        <p className={styles.description}>{product.description}</p>
                    </div>

                    <div className={styles.containerAllBtns}>
                        <button
                            onClick={
                                size === "" ? () => alertErrorSize() : () => AddToBag(product)
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
                    </div>
                </div>
            </div>
        </div>
    );
}
