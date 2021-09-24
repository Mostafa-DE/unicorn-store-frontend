import styles from "@/styles/ProductDetails.module.css";
import { useState } from "react";
import ImageMagnifier from "./ImageMagnifier";
import { AiOutlineLine } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import RateStarIcons from "./RateStarIcons";

export default function ProductDetails({ product }) {
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
                onClick={() => handleChangeImage(image.url)}
                className={styles.smallImage}
                src={image.url}
              />
            ))}
            {product.videos?.map((video) => (
              <img
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
            <AiOutlineLine className="lineIcone" />
          </div>

          <div className={styles.containerPriceProduct}>
            <p className={styles.priceProduct}> {product.price} JD :السعر </p>
          </div>
          <div className={styles.containerColorsAndSizes}>
            <div className={styles.containerColorsProduct}>
              <div className={styles.colorsProduct}>
                <select
                  id="colors"
                  className="form-select"
                  aria-label="Default select example"
                  style={{ width: "6rem" }}
                >
                  <option value="1">الأحمر</option>
                  <option value="2">الأزرق</option>
                  <option value="3">الأسود</option>
                </select>
                <label className={styles.labelColors} htmlFor="colors">
                  :اللون
                </label>
              </div>
            </div>
            <div className={styles.containerSizesProduct}>
              <div className={styles.sizesProduct}>
                <select
                  id="sizes"
                  className="form-select"
                  aria-label="Default select example"
                  style={{ width: "6rem" }}
                >
                  {product.S === true ? <option value="S">S</option> : null}
                  <option value="M">M</option>
                  {product.L === true ? <option value="L">L</option> : null}
                  {product.XL === true ? <option value="XL">XL</option> : null}
                  {product.XXL === true ? (
                    <option value="XXL">XXL</option>
                  ) : null}
                </select>
                <label className={styles.labelSizes} htmlFor="sizes">
                  :القياس
                </label>
              </div>
            </div>
          </div>
          <div className={styles.containerDescription}>
            <p className={styles.description}>{product.description}</p>
          </div>
          <div className={styles.containerAllBtns}>
            <button className={styles.addToBagBtn}>أضف إلى السلة</button>
            <div className={styles.containerOtherBtns}>
              <button className={styles.addToWishlistbtn}>
                أضف إلى المفضلة
              </button>
              <button className={styles.continueShoppingBtn}>
                أكمل التسوق
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
