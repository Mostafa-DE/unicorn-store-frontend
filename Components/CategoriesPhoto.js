import styles from "@/styles/CategoriesPhoto.module.css";

export default function CategoriesPhoto() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.containerWomenCard}>
          <div className={styles.womenCardContent}>
            <p>منتجات النساء</p>
            <button className={styles.WomenShopBtn}>تسوق الآن</button>
          </div>
        </div>

        <div className={styles.containerKidsCard}>
          <div className={styles.kidsCardContent}>
            <p>منتجات الأطفال</p>
            <button className={styles.kidsShopBtn}>تسوق الآن</button>
          </div>
        </div>

        <div className={styles.containerMenCard}>
          <div className={styles.menCardContent}>
            <p>منتجات الرجال</p>
            <button className={styles.menShopBtn}>تسوق الآن</button>
          </div>
        </div>
      </div>
    </div>
  );
}
