import styles from "@/components/WishList/WishList.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import { WishBagContext } from "@/context/WishBagContext";
import { AiOutlineLine } from "react-icons/ai";
import Link from "next/link";
import { API_URL } from "@/config/index";
import Box from "@mui/material/Box";

export default function WishList({ products, token }) {
  const router = useRouter();

  // wish bag context
  //TODO: add right types here
  // @ts-ignore
  const { removeFromWishBag } = useContext(WishBagContext);
  // xxxxxxxxxxxxxxxxx

  const deleteProductFromWishList = async (product) => {
    await fetch(`${API_URL}/wishes/${product.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await removeFromWishBag(product);
    return router.reload();
  };

  const deleteAllProductsFromWishList = async (products) => {
    for (let product of products) {
      await fetch(`${API_URL}/wishes/${product.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await removeFromWishBag(product);
    }
    return router.reload();
  };

  return (
    <div className={styles.main}>
      <Box data-aos="fade-in" className="containerTitle">
        <h1 className="h1Title"> قائمة المفضلة </h1>
        <AiOutlineLine className="lineIcon" />
      </Box>
      {products.length !== 0 && (
        <Box display="flex" justifyContent="center">
          <button
            className={styles.deleteAllProductBtn}
            onClick={() => deleteAllProductsFromWishList(products)}
          >
            حذف جميع المنتجات
          </button>
        </Box>
      )}
      {products.length !== 0 ? (
        <Box data-aos="fade-right" className={styles.containerWishList}>
          {products.map((product) => (
            <Box key={product.id} className={styles.containerProducts}>
              <img width={200} height={240} src={product.image.url} />
              <p className={styles.name}>{product.name}</p>
              <p className={styles.price}>{product.price} JD</p>
              <button
                className={styles.goToProductDetailsPage}
                onClick={() => router.push(`/${product.productDetailsPage}`)}
              >
                التفاصيل
              </button>
              <p
                className={styles.deleteBtn}
                onClick={() => deleteProductFromWishList(product)}
              >
                حذف
              </p>
            </Box>
          ))}
        </Box>
      ) : (
        <Box className={styles.containerShoppingBagEmpty}>
          <h1> قائمة المفضلة الخاصة بك فارغة </h1>
          <p>أضف بعض المنتجات التي تنوي شرائها في المستقبل</p>
          <Link href="/">
            <button className={styles.continueShoppingBtn}>أكمل التسوق</button>
          </Link>
        </Box>
      )}
    </div>
  );
}
