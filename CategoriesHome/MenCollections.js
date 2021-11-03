import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

export const MenCollections = (
  <div className={styles.dropDown}>
    <li className={styles.linkProducts}>
      أقسام الرجال <IoIosArrowDown />
    </li>
    <div className={styles.dropDownContent}>
      <div className={styles.containerDropDownContent}>
        <div className={styles.collectionsDiv}>
          <p>الأزياء الرجالية</p>
          <ul>
            <li>
              <Link href="/categories/men-fashions/men-pajamas/pajamas">
                <a className={styles.categoryLink}>البيجامات</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/men-fashions/all-products/other-products">
                <a className={styles.categoryLink}>جميع المنتجات </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.img}>
          <img
            src="/images/unicorn/men fashions.jpg"
            width={400}
            height={380}
            className={styles.img}
          />
        </div>
      </div>
    </div>
  </div>
);
