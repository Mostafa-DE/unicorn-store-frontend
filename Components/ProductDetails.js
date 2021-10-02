import styles from "@/styles/ProductDetails.module.css";
import { useContext, useState } from "react";
import Link from "next/link";
import { BagContext } from "@/context/BagContext";
import { AuthContext } from "@/context/AuthContext";
import ImageMagnifier from "./ImageMagnifier";
import { AiOutlineLine } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import RateStarIcons from "./RateStarIcons";
import { useRouter } from "next/router";
import useSelectInput from "@/Hooks/useSelectInput";

export default function ProductDetails({ product }) {
  const router = useRouter();

  // shopping bag context
  const { bag, addToBag } = useContext(BagContext);
  const { items = [] } = bag;
  console.log(items);
  // xxxxxxxxxxxxxxxxxxxx

  // Auth Context
  const { user } = useContext(AuthContext);
  // xxxxxxxxxxxx

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

  // state for select input (Size)
  const [size, handleChangeSelectSize] = useSelectInput("...");
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  // state for select input (Color)
  const [color, handleChangeSelectColor] = useSelectInput("...");
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

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
            <AiOutlineLine className="lineIcon" />
          </div>

          <div className={styles.containerPriceProduct}>
            <p className={styles.priceProduct}> {product.price} JD :السعر </p>
          </div>
          <div className={styles.containerColorsAndSizes}>
            <div className={styles.containerSizesProduct}>
              <div className={styles.sizesProduct}>
                <select
                  onChange={handleChangeSelectSize}
                  id="sizes"
                  className="form-select"
                  aria-label="Default select example"
                  style={{ width: "6rem" }}
                  value={size}
                >
                  <option>...</option>
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
            <button
              onClick={
                size === "..."
                  ? () => console.log(alert("you have to enter a size"))
                  : () => addToBag(product, size)
              }
              className={styles.addToBagBtn}
            >
              أضف إلى السلة
            </button>
            <div className={styles.containerOtherBtns}>
              <button
                onClick={
                  user === null
                    ? () => router.push("/account/login")
                    : () =>
                        console.log(
                          alert("the item has been added to wishlist")
                        )
                }
                className={styles.addToWishlistbtn}
              >
                أضف إلى المفضلة
              </button>
              <Link href="/">
                <button className={styles.continueShoppingBtn}>
                  أكمل التسوق
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
