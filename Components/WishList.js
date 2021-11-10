import styles from "@/styles/WishList.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import { WishBagContext } from "@/context/WishBagContext";
import { AiOutlineLine } from "react-icons/ai";
import Link from "next/link";
import { API_URL } from "@/config/index";

export default function WishList({ products, token }) {
  const router = useRouter();

  // wish bag context
  const { removeFromWishBag } = useContext(WishBagContext);
  // xxxxxxxxxxxxxxxxx

  const deleteFromWishList = async (product) => {
    await fetch(`${API_URL}/wishes/${product.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await removeFromWishBag(product);
    router.reload();
  };

  return (
    <div className={styles.main}>
      <div data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title"> قائمة المفضلة </h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      {products.length !== 0 ? (
        <div data-aos="fade-right" className={styles.containerWishList}>
          {products.map((product) => (
            <div key={product.id} className={styles.containerProducts}>
              <img width={200} height={240} src={product.image.url} />
              <p className={styles.name}>{product.name}</p>
              <p className={styles.price}>{product.price} JD</p>
              <button
                className={styles.goToProductDetailsPage}
                onClick={() =>
                  router.push(`/${product.productDetailsPage}/${product.slug}`)
                }
              >
                التفاصيل
              </button>
              <p
                className={styles.deleteBtn}
                onClick={() => deleteFromWishList(product)}
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