import styles from "@/styles/ProductItems.module.css";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { WishBagContext } from "@/context/WishBagContext";
import { CompareContext } from "@/context/CompareContext";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import RateStarIcons from "./RateStarIcons";
import { useRouter } from "next/router";
import { GiScales } from "react-icons/gi";
import { HiCheckCircle } from "react-icons/hi";

export default function ProductItems({ product, pathname }) {
  const router = useRouter();

  // Auth Context
  const { user } = useContext(AuthContext);
  // xxxxxxxxxxxx

  // Wish Bag context
  const { wishBag, addToWishBag } = useContext(WishBagContext);
  const { wishItems = [] } = wishBag;
  // xxxxxxxxxxxxxxxx

  // Compare Context
  const { productsCompare, addToCompare } = useContext(CompareContext);
  const { compareItems = [] } = productsCompare;
  // xxxxxxxxxxxxxxxx

  const productWish = wishItems.find((element) => element.id === product.id);

  const productCompare = compareItems.find(
    (element) => element.id === product.id
  );

  return (
    <div className={styles.container}>
      <img className={styles.imgs} src={product.images[0].url} />
      <div className={styles.overlay}>
        <div className={styles.items}>
          <div className={styles.containerIcons}>
            <div
              onClick={
                user === null
                  ? () => router.push("/account/login")
                  : () => addToWishBag(product)
              }
            >
              {productWish?.isProductExist === true ? (
                <IoMdHeart className={styles.wishIconFilled} />
              ) : (
                <IoMdHeartEmpty className={styles.wishIconOutline} />
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
          </div>
          <RateStarIcons className={styles.rateStarIcons} />
        </div>
        <div className={`${styles.compareItems} ${styles.head}`}>
          <p className={styles.nameText}>{product.name}</p>
          <hr className={styles.hr} />
        </div>
        <div className={`${styles.compareItems} ${styles.price}`}>
          <p className={styles.oldPrice}>{product.oldPrice} JD</p>
          <p className={styles.newPrice}>{product.price} JD</p>
        </div>
        <div className={styles.quickview}>
          <Link href={`${pathname}/${product.slug}`}>
            <button className={styles.quickviewBtn}>التفاصيل</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
