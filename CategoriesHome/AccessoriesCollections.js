import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

export const AccessoriesCollections = (
  <div className={styles.dropDown}>
    <li className={styles.linkProducts}>
      قسم الإكسسوارات <IoIosArrowDown />
    </li>
    <div className={styles.dropDownContent}>
      <div className={styles.containerDropDownContent}>
        <div className={styles.collectionsDiv}>
          <p>أقسام الإكسسوارات</p>
          <span>نساء</span>
          <ul>
            <li>
              <Link href="/categories/accessories/women/women-necklace/necklace">
                <a className={styles.categoryLink}>قلادات</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/accessories/women/women-rings/rings">
                <a className={styles.categoryLink}>خواتم</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/accessories/women/women-bracelets/bracelets">
                <a className={styles.categoryLink}>أساور </a>
              </Link>
            </li>
            <li>
              <Link href="/categories/accessories/women/all-products/other-products">
                <a className={styles.categoryLink}>جميع المنتجات </a>
              </Link>
            </li>
          </ul>
          <span>رجال</span>
          <ul>
            <li>
              <Link href="/categories/accessories/men/men-watches/watches">
                <a className={styles.categoryLink}>ساعات</a>
              </Link>
            </li>
            <li>
              <Link href="/categories/accessories/men/all-products/other-products">
                <a className={styles.categoryLink}>جميع المنتجات </a>
              </Link>
            </li>
          </ul>
          <span>الأطفال</span>
          <ul>
            <li>
              <Link href="/categories/accessories/kids/all-products/products">
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
        <div className={styles.img}>
          <img
            src="/images/unicorn/accessories.jpg"
            width={400}
            height={538}
            className={styles.img}
          />
        </div>
      </div>
    </div>
  </div>
);
