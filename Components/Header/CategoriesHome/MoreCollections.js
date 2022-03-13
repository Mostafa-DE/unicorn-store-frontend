import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

export const MoreCollections = (
  <div className={styles.dropDown}>
    <li className={styles.linkProducts}>
      الأقسام الأخرى <IoIosArrowDown />
    </li>
    <div className={styles.dropDownContent}>
      <div className={styles.containerDropDownContent}>
        <div className={styles.collectionsDiv}>
          <p>جميع الأقسام</p>
          <span>تجميل</span>
          <ul>
            <li>
              <Link href="/categories/makeup/products">
                <a className={styles.categoryLink}>جميع المنتجات</a>
              </Link>
            </li>
          </ul>

          <span>الباكيجات</span>
          <ul>
            <li>
              <Link href="/categories/packages/products">
                <a className={styles.categoryLink}>جميع المنتجات</a>
              </Link>
            </li>
          </ul>

          <span>الأدوات المنزلية</span>
          <ul>
            <li>
              <Link href="/categories/houseware/products">
                <a className={styles.categoryLink}>جميع المنتجات</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.img}>
          <img src="/images/unicorn2.png" width={400} className={styles.img} />
        </div>
      </div>
    </div>
  </div>
);
