import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

export const WomanCollections = (
  <div className={styles.dropDown}>
    <li className={styles.linkProducts}>
      أقسام النساء <IoIosArrowDown />
    </li>
    <div className={styles.dropDownContent}>
      <div className={styles.containerDropDownContent}>
        <div className={styles.collectionsDiv}>
          <p>الأزياء النسائية</p>
          <span>منتجات صناعة تركية</span>
          <ul>
            <li>
              <Link href="/categories/women-fashions/turkey-dresses/dresses">
                <a className={styles.categoryLink}>فساتين سهرة</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/women-fashions/turkey-lingeries/lingerie">
                <a className={styles.categoryLink}>ﻻنجري</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/women-fashions/turkey-abayas/abaya">
                <a className={styles.categoryLink}>عبايات و قطافين</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/women-fashions/turkey-all-products/other-products">
                <a
                  className={`${styles.categoryLink} ${styles.collectionText}`}
                  style={{ padding: "1rem 0 2rem 0" }}
                >
                  جميع المنتجات
                </a>
              </Link>
            </li>
          </ul>

          <span>منتجات صناعة محلية</span>
          <ul>
            <li>
              <Link href="/categories/women-fashions/local-dresses/dresses">
                <a className={styles.categoryLink}>فساتين سهرة</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/women-fashions/local-lingeries/lingerie">
                <a className={styles.categoryLink}>ﻻنجري</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/women-fashions/local-abayas/abaya">
                <a className={styles.categoryLink}>عبايات و قطافين</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/women-fashions/local-all-products/other-products">
                <a
                  className={styles.categoryLink}
                  style={{ padding: "1rem 0 2rem 0" }}
                >
                  جميع المنتجات
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <img
            src="/images/unicorn/women fashions.jpg"
            width={380}
            height={521}
            className={styles.img}
          />
        </div>
      </div>
    </div>
  </div>
);
