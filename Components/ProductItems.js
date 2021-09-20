import styles from "@/styles/ProductItems.module.css";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import RateStarIcons from "./RateStarIcons";

export default function ProductItems({ product }) {
  return (
    <div className={styles.container}>
      <img className={styles.imgs} src={product.images[0].url} />
      <div className={styles.overlay}>
        <div className={styles.items}>
          <IoMdHeartEmpty className={styles.wishIconOutline} />
          <IoMdHeart className={styles.wishIconFilled} />
          <RateStarIcons className={styles.rateStarIcons} />
        </div>
        <div className={`${styles.items} ${styles.head}`}>
          <p className={styles.nameText}>{product.name}</p>
          <hr className={styles.hr} />
        </div>
        <div className={`${styles.items} ${styles.price}`}>
          <p className={styles.oldPrice}>{product.oldPrice} JD</p>
          <p className={styles.newPrice}>{product.price} JD</p>
        </div>
        <div className={styles.quickview}>
          <button className={styles.quickviewBtn}>التفاصيل</button>
        </div>
        <div className={styles.cart}>
          <button className={styles.addToCartBtn}>أضف إلى السلة</button>
        </div>
      </div>
    </div>
  );
}
