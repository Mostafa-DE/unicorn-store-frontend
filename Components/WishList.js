import styles from "@/styles/WishList.module.css";
import { useContext } from "react";
import { WishBagContext } from "@/context/WishBagContext";
import { useRouter } from "next/router";
import { AiOutlineLine } from "react-icons/ai";
import Link from "next/link";

export default function WishList() {
  const router = useRouter();

  const { wishBag, removeFromWishBag } = useContext(WishBagContext);
  const { wishItems = [] } = wishBag;

  return (
    <div className={styles.main}>
      <div className="containerTitle">
        <h1 className="h1Title"> قائمة المفضلة </h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      {wishItems.length !== 0 ? (
        <div className={styles.containerWishList}>
          {wishItems.map((product) => (
            <div className={styles.containerProducts}>
              <img width={200} height={240} src={product.images[0].url} />
              <p className={styles.name}>{product.name}</p>
              <p className={styles.price}>{product.price} JD</p>
              <button
                className={styles.goToProductDetailsPage}
                onClick={() =>
                  router.push(`${product.productDetailsPage}/${product.slug}`)
                }
              >
                التفاصيل
              </button>
              <p
                className={styles.deleteBtn}
                onClick={() => removeFromWishBag(product)}
              >
                حذف
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.containerShoppingBagEmpty}>
          <h1> قائمة المفضلة الخاصة بك فارغة </h1>
          <p>أضف بعض المنتجات التي تنوي شرائها في المستقبل</p>
          <Link href="/">
            <button className={styles.continueShoppingBtn}>أكمل التسوق</button>
          </Link>
        </div>
      )}
    </div>
  );
}
