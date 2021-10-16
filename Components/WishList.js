import styles from "@/styles/WishList.module.css";
import { useRouter } from "next/router";
import { AiOutlineLine } from "react-icons/ai";
import Link from "next/link";
import { API_URL } from "@/config/index";
import Swal from "sweetalert2";

export default function WishList({ products, token }) {
  const router = useRouter();

  const deleteFromWishList = async (product) => {
    Swal.fire({
      title: "هل أنت متأكد من  أنك تريد حذف هذا المنتج ؟؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#333",
      cancelButtonColor: "#fb9aa7",
      confirmButtonText: "!! نعم أنا متأكد",
      cancelButtonText: "لا",
      showClass: {
        popup: "animate__animated animate__flipInX",
      },
      hideClass: {
        popup: "animate__animated animate__flipOutX",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          fetch(`${API_URL}/wishes/${product.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          router.reload();
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div className={styles.main}>
      <div className="containerTitle">
        <h1 className="h1Title"> قائمة المفضلة </h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      {products.length !== 0 ? (
        <div className={styles.containerWishList}>
          {products.map((product) => (
            <div key={product.id} className={styles.containerProducts}>
              <img width={200} height={240} src={product.image.url} />
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
