import styles from "@/components/ProductDetails/ProductDetails.module.css";
import "../../node_modules/animate.css/animate.css";
import { useContext, useState } from "react";
import Link from "next/link";
import { BagContext } from "@/context/BagContext";
import { WishBagContext } from "@/context/WishBagContext";
import { AuthContext } from "@/context/AuthContext";
import ImageMagnifier from "../ImageMagnifier/ImageMagnifier";
import { AiOutlineLine } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import RateStarIcons from "../RateStarIcons/RateStarIcons";
import { useRouter } from "next/router";

export default function ProductDetails({ product }) {
  const router = useRouter();

  // shopping bag context
  const { addToBag } = useContext(BagContext);
  // xxxxxxxxxxxxxxxxxxxx
  const AddToBag = async (product) => {
    await addToBag(product);
    router.push("/products/shopping-bag");
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
            <video className={styles.video} controls>
              <source src={video} />
            </video>
          ) : null}
          {image !== "" ? (
            <ImageMagnifier src={image} width={"100%"} height={"600px"} />
          ) : null}
        </div>

        <div className={styles.containerDetails}>
          <div className={styles.containerRateAndWishList}>
            <RateStarIcons />
            <IoMdHeartEmpty className={styles.heartIcon} />
          </div>

          <div className={styles.containerTitle}>
            <p className={styles.nameProduct}> {product.name} </p>
            <AiOutlineLine className="lineIcon" />
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
