import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

export const KidsCollections = (
  <div className={styles.dropDown}>
    <li className={styles.linkProducts}>
      أقسام الأطفال <IoIosArrowDown />
    </li>
    <div className={styles.dropDownContent}>
      <div className={styles.containerDropDownContent}>
        <div className={styles.collectionsDiv}>
          <p>أزياء الأطفال</p>
          <span>منتجات صناعة تركية</span>
          <ul>
            <li>
              <Link href="/categories/kids-fashions/kids-pajamas/pajamas">
                <a className={styles.categoryLink}>البيجامات</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/kids-fashions/kids-dresses/dresses">
                <a className={styles.categoryLink}>فساتين</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/kids-fashions/all-products/other-products">
                <a className={styles.categoryLink}>جميع المنتجات </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.img}>
          <img
            src="/images/unicorn/kids fashions.jpg"
            width={400}
            height={400}
            className={styles.img}
          />
        </div>
      </div>
    </div>
  </div>
);
