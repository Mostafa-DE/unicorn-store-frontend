import styles from "@/styles/CategoriesPhoto.module.css";
import Link from "next/link";
import { AiOutlineLine } from "react-icons/ai";

export default function CategoriesPhoto() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.containerWomenCard}>
          <div className={styles.womenCardContent}>
            <p className={styles.womenFashionText}>أزياء النساء</p>
            <button className={styles.WomenShopBtn}>تسوق الآن</button>
            <div className={styles.overlay}>
              <div className={styles.containerCategories}>
                <div className={styles.allCategories}>
                  <ul className={styles.WomenUl}>
                    <div className={styles.containerTitle}>
                      <p className={styles.titleCategoriesWomen}>
                        منتجات تركية
                      </p>
                      <AiOutlineLine className={styles.lineIcon} />
                    </div>
                    <Link href="/categories/women-fashions/turkey-dresses/dresses">
                      <li>فساتين سهرة</li>
                    </Link>
                    <Link href="/categories/women-fashions/turkey-lingeries/lingerie">
                      <li>لانجري</li>
                    </Link>
                    <Link href="/categories/women-fashions/turkey-abayas/abaya">
                      <li>عبايات و قطافين</li>
                    </Link>
                    <Link href="/categories/women-fashions/turkey-all-products/other-products">
                      <li> جميع المنتجات </li>
                    </Link>
                  </ul>
                </div>
                <div className={styles.allCategories}>
                  <ul className={styles.WomenUl}>
                    <div className={styles.containerTitle}>
                      <p className={styles.titleCategoriesWomen}>
                        منتجات محلية
                      </p>
                      <AiOutlineLine className={styles.lineIcon} />
                    </div>
                    <Link href="/categories/women-fashions/local-dresses/dresses">
                      <li>فساتين سهرة</li>
                    </Link>
                    <Link href="/categories/women-fashions/local-lingeries/lingerie">
                      <li>لانجري</li>
                    </Link>
                    <Link href="/categories/women-fashions/local-abayas/abaya">
                      <li>عبايات و قطافين</li>
                    </Link>
                    <Link href="/categories/women-fashions/local-all-products/other-products">
                      <li> جميع المنتجات </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.containerKidsCard}>
          <div className={styles.kidsCardContent}>
            <p className={styles.kidsFashionText}>أزياء الأطفال</p>
            <button className={styles.kidsShopBtn}>تسوق الآن</button>
            <div className={styles.overlay}>
              <div className={styles.containerCategories}>
                <div className={styles.allCategories}>
                  <ul>
                    <div className={styles.containerTitle}>
                      <p className={styles.titleCategories}> قسم الأطفال </p>
                      <AiOutlineLine className={styles.lineIcon} />
                    </div>
                    <Link href="/categories/kids-fashions/kids-pajamas/pajamas">
                      <li> البيجامات </li>
                    </Link>
                    <Link href="/categories/kids-fashions/kids-dresses/dresses">
                      <li>فساتين</li>
                    </Link>
                    <Link href="/categories/kids-fashions/all-products/other-products">
                      <li> جميع المنتجات الأخرى </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.containerMenCard}>
          <div className={styles.menCardContent}>
            <p className={styles.menFashionText}>أزياء الرجال</p>
            <button className={styles.menShopBtn}>تسوق الآن</button>
            <div className={styles.overlay}>
              <div className={styles.containerCategories}>
                <div className={styles.allCategories}>
                  <ul>
                    <div className={styles.containerTitle}>
                      <p className={styles.titleCategories}> قسم الرجال </p>
                      <AiOutlineLine className={styles.lineIcon} />
                    </div>
                    <Link href="/categories/men-fashions/men-pajamas/pajamas">
                      <li> البيجامات </li>
                    </Link>
                    <Link href="/categories/men-fashions/all-products/other-products">
                      <li> جميع المنتجات الأخرى </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.containerAccessories}>
          <div className={styles.accessoriesCardContent}>
            <p className={styles.accessoriesText}> الإكسسوارات </p>
            <button className={styles.accessoriesShopBtn}>تسوق الآن</button>
            <div className={styles.overlay}>
              <div className={styles.containerCategoriesAccessories}>
                <div className={styles.allCategories}>
                  <ul>
                    <div className={styles.containerTitle}>
                      <p className={styles.titleCategories}>النساء</p>
                      <AiOutlineLine className={styles.lineIcon} />
                    </div>
                    <Link href="/categories/accessories/women/women-necklace/necklace">
                      <li> قلادات </li>
                    </Link>
                    <Link href="/categories/accessories/women/women-rings/rings">
                      <li>خواتم</li>
                    </Link>
                    <Link href="/categories/accessories/women/women-bracelets/bracelets">
                      <li> أساور </li>
                    </Link>
                    <Link href="/categories/accessories/women/all-products/other-products">
                      <li> جميع المنتجات </li>
                    </Link>
                  </ul>
                </div>
                <div className={styles.allCategories}>
                  <ul>
                    <div className={styles.containerTitle}>
                      <p className={styles.titleCategories}>الرجال</p>
                      <AiOutlineLine className={styles.lineIcon} />
                    </div>
                    <Link href="/categories/accessories/men/men-watches/watches">
                      <li> ساعات </li>
                    </Link>

                    <Link href="/categories/accessories/men/all-products/other-products">
                      <li> جميع المنتجات </li>
                    </Link>
                  </ul>
                </div>

                <div className={styles.allCategories}>
                  <ul>
                    <div className={styles.containerTitle}>
                      <p className={styles.titleCategories}>الأطفال</p>
                      <AiOutlineLine className={styles.lineIcon} />
                    </div>
                    <Link href="/categories/accessories/kids/all-products/products">
                      <li> جميع المنتجات </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.containerMakeup}>
          <div className={styles.makeupCardContent}>
            <p className={styles.makeupText}>مستحضرات التجميل</p>
            <Link href="/categories/makeup/products">
              <button className={styles.makeupShopBtn}>تسوق الآن</button>
            </Link>
          </div>
        </div>

        <div className={styles.containerHouseware}>
          <div className={styles.housewareCardContent}>
            <p className={styles.housewareText}> الأدوات المنزلية</p>
            <Link href="/categories/makeup/products">
              <button className={styles.housewareShopBtn}>تسوق الآن</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
