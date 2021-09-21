import styles from "@/styles/ProductDetails.module.css";
import { useState } from "react";
import ImageMagnifier from "./ImageMagnifier";
import { AiOutlineLine } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import RateStarIcons from "./RateStarIcons";

export default function ProductDetails() {
  const [image, setImage] = useState("/images/unicorn/evening dresses.jpg");
  const handleChangeImage1 = () => {
    setImage("/images/unicorn/women fashions.jpg");
  };
  const handleChangeImage2 = () => {
    setImage("/images/unicorn/men fashions.jpg");
  };
  const handleChangeImage3 = () => {
    setImage("/images/unicorn/kids fashions.jpg");
  };
  const handleChangeImage4 = () => {
    setImage("/images/unicorn/evening dresses.jpg");
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.containerImages}>
          <div className={styles.smallImagesProduct}>
            <img
              onClick={handleChangeImage1}
              className={styles.smallImage}
              src="/images/unicorn/women fashions.jpg"
            />
            <img
              onClick={handleChangeImage2}
              className={styles.smallImage}
              src="/images/unicorn/men fashions.jpg"
            />
            <img
              onClick={handleChangeImage3}
              className={styles.smallImage}
              src="/images/unicorn/kids fashions.jpg"
            />
            <img
              onClick={handleChangeImage4}
              className={styles.smallImage}
              src="/images/unicorn/evening dresses.jpg"
            />
          </div>
          <ImageMagnifier src={image} width={"100%"} height={"600px"} />
        </div>

        <div className={styles.containerDetails}>
          <div className={styles.containerRateAndWishList}>
            <RateStarIcons />
            <IoMdHeartEmpty className={styles.heartIcon} />
          </div>

          <div className={styles.containerTitle}>
            <p className={styles.nameProduct}> فستان سهرة فخم </p>
            <AiOutlineLine className="lineIcone" />
          </div>

          <div className={styles.containerPriceProduct}>
            <p className={styles.priceProduct}> 20 JD :السعر </p>
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
                  <option value="1">S</option>
                  <option value="2">M</option>
                  <option value="3">L</option>
                  <option value="3">XL</option>
                  <option value="3">XXL</option>
                </select>
                <label className={styles.labelSizes} htmlFor="sizes">
                  :القياس
                </label>
              </div>
            </div>
          </div>
          <div className={styles.containerDescription}>
            <p className={styles.description}>
              eded edewe fwef wefwfwef wefewfwe fewfwe hvefrfr ewfwferfw ecd
              ecfewcve fewfcece edac ecdei eicjeic eicjeicj eicjeicci eijciaj
              jiciwejc icdwjci jciejciej ecjiejeic eijcej ie eijceicj eicj
            </p>
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
