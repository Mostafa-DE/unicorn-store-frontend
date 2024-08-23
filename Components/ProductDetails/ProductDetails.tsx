import styles from "@/components/ProductDetails/ProductDetails.module.css";
import "../../node_modules/animate.css/animate.css";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { BagContext } from "@/context/BagContext";
import ImageMagnifier from "../ImageMagnifier/ImageMagnifier";
import { AiOutlineLine } from "react-icons/ai";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BiShareAlt } from "react-icons/bi";
import { HiCheckCircle } from "react-icons/hi";
import { GiScales } from "react-icons/gi";
import RateStarIcons from "../RateStarIcons/RateStarIcons";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import { WishBagContext } from "@/context/WishBagContext";
import { CompareContext } from "@/context/CompareContext";
import DialogSocialShare from "@/components/DialogSocialShare/DialogSocialShare";
import Popover from "@/components/PopOver";
import Box from "@mui/material/Box";
import Reviews from "@/components/Reviews";
import { pagesWithoutSize } from "./urlsPagesWithoutSize";
import {
  AlertSizeNotExist,
  AlertErrorSize,
} from "@/components/ProductDetails/helpers";
import { addProductToWishList } from "@/helpers/addProductToWishList";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";

export default function ProductDetails({ product, token, reviews }) {
  const router = useRouter();
  //TODO: add right types here
  // @ts-ignore
  const { addToBag } = useContext(BagContext);
  //TODO: add right types here
  // @ts-ignore
  const { wishBag, addToWishBag } = useContext(WishBagContext);
  const { wishItems = [] } = wishBag;
  //TODO: add right types here
  // @ts-ignore
  const { productsCompare, addToCompare } = useContext(CompareContext);
  const { compareItems = [] } = productsCompare;

  const [shareDialog, setShareDialog] = useState(false);
  const [video, setvideo] = useState("");
  const [image, setImage] = useState(product.images[0]?.url);
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
      .map((color, idx) => (
        <div
          key={idx}
          style={{ backgroundColor: `${color}` }}
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
              <source src={video} />
            </video>
          ) : null}
          {image !== "" ? (
            <ImageMagnifier src={image} width={"100%"} height={"600px"} />
          ) : null}
        </div>

        <Box className={styles.containerDetails}>
          <Box className={styles.containerRateAndWishList}>
            <RateStarIcons />
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
                <IoMdHeart className={styles.heartIcon} />
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
            <AiOutlineLine className="lineIcon" />
          </Box>

          {/* Discount percentage */}
          {product.discount && (
            <Box>
              <p className={styles.discountPriceProduct}>
                {" "}
                Save {product.discount}%{" "}
              </p>
              <hr style={{ width: "21%", margin: "0 0 1rem 0" }} />
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
                <p className={styles.titleText}>يرجى إدخال القياس المناسب</p>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" required>
                    Select Size
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={size}
                    label="Select Size"
                    onChange={(e: SelectChangeEvent) => setSize(e.target.value)}
                  >
                    {product.S && <MenuItem value="S">S</MenuItem>}
                    {product.M && <MenuItem value="M">M</MenuItem>}
                    {product.L && <MenuItem value="L">L</MenuItem>}
                    {product.XL && <MenuItem value="XL">XL</MenuItem>}
                    {product.XXL && <MenuItem value="2XL">2XL</MenuItem>}
                    {product.XXXL && <MenuItem value="3XL">3XL</MenuItem>}
                  </Select>
                </FormControl>
              </Box>
            </>
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
      <Reviews product={product} reviews={reviews} token={token} />
    </Box>
  );
}
