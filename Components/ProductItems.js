import styles from "@/styles/ProductItems.module.css";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { WishBagContext } from "@/context/WishBagContext";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import RateStarIcons from "./RateStarIcons";
import { useRouter } from "next/router";

export default function ProductItems({ product, pathname }) {
  const router = useRouter();

  // Auth Context
  const { user } = useContext(AuthContext);
  // xxxxxxxxxxxx

  // Wish Bag context
  const { wishBag, addToWishBag } = useContext(WishBagContext);
  // xxxxxxxxxxxxxxxx

  return (
    <div className={styles.container}>
      <img className={styles.imgs} src={product.images[0].url} />
      <div className={styles.overlay}>
        <div className={styles.items}>
          <div
            onClick={
              user === null
                ? () => router.push("/account/login")
                : () => addToWishBag(product)
            }
          >
            <IoMdHeartEmpty className={styles.wishIconOutline} />
            <IoMdHeart className={styles.wishIconFilled} />
          </div>
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
          <Link href={`${pathname}/${product.slug}`}>
            <button className={styles.quickviewBtn}>التفاصيل</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
