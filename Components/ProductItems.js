import styles from "@/styles/ProductItems.module.css";
import "animate.css";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { CompareContext } from "@/context/CompareContext";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import RateStarIcons from "./RateStarIcons";
import { useRouter } from "next/router";
import { GiScales } from "react-icons/gi";
import { HiCheckCircle } from "react-icons/hi";
import { API_URL } from "@/config/index";
import Swal from "sweetalert2";

export default function ProductItems({ product, pathname, token }) {
  const router = useRouter();

  // Auth Context
  const { user } = useContext(AuthContext);
  // xxxxxxxxxxxx

  const addToWishList = async (product) => {
    try {
      await fetch(`${API_URL}/wishes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: `${product.name}`,
          price: `${product.price}`,
          image: `${product.images[0].id}`,
          slug: `${product.slug}`,
          productDetailsPage: `${pathname}`,
        }),
      });

      Swal.fire({
        title: "تم إضافة المنتج إلى قائمة المفضلة لديك",
        icon: "success",
        confirmButtonColor: "#fb9aa7",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  // xxxxxxxxxxxxxxxx

  // Compare Context
  const { productsCompare, addToCompare } = useContext(CompareContext);
  const { compareItems = [] } = productsCompare;
  // xxxxxxxxxxxxxxxx

  // const productWish = wishItems.find((element) => element.id === product.id);

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
                  : () => addToWishList(product)
              }
            >
              {/* TODO: Make Empty heart and filled heart work fine  */}

              {/* {productWish?.isProductExist === true ? (
                <IoMdHeart className={styles.wishIconFilled} />
              ) : (
                
              )} */}
              <IoMdHeartEmpty className={styles.wishIconOutline} />
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
