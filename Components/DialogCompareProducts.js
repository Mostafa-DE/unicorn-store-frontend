import styles from "@/styles/DialogCompareProducts.module.css";
import React, { useContext } from "react";
import { CompareContext } from "@/context/CompareContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AiOutlineLine } from "react-icons/ai";
import { VscClose } from "react-icons/vsc";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";

export default function DialogCompareProducts({
  compareDialog,
  closeCompareDialog
}) {
  const router = useRouter();
  // compare products context
  const { productsCompare, removeFromCompare, removeAllProducts } = useContext(
    CompareContext
  );
  const { compareItems = [] } = productsCompare;
  // xxxxxxxxxxxxxxxxxxxxxxxx

  return (
    <div>
      <Dialog
        open={compareDialog}
        fullWidth={true}
        maxWidth={"lg"}
        onClose={closeCompareDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div data-aos="zoom-in" className={styles.containerTitle}>
            <p className={styles.titleCompareProducts}>المقارنة بين المنتجات</p>
            <AiOutlineLine className="lineIcon" />
          </div>
          <div className={styles.closeIcon}>
            <VscClose onClick={closeCompareDialog} />
          </div>
          {compareItems.length !== 0 && (
            <a className={styles.deleteAllBtn} onClick={removeAllProducts}>
              <FaTrash className={styles.deleteIconAll} /> حذف الكل
            </a>
          )}
        </DialogTitle>

        <DialogContent className={styles.DialogContent}>
          {compareItems.length !== 0 ? (
            <table data-aos="fade-in" className={styles.containerTable}>
              <tbody>
                <tr>
                  <td className={styles.titleTable}>المنتجات</td>
                  {compareItems.map(product => (
                    <td key={product.id} className={styles.borderBottomTitle}>
                      <div className={styles.containerProducts}>
                        <p
                          className={styles.deleteCompareProduct}
                          onClick={() => removeFromCompare(product)}
                        >
                          <FaTrash className={styles.deleteIconItem} />
                        </p>
                        <img
                          width={200}
                          height={240}
                          src={product.images[0].url}
                        />
                        <p className={styles.name}>{product.name}</p>
                        <p className={styles.price}>{product.price} JD</p>
                        <button
                          className={styles.goToProductDetailsPage}
                          onClick={() =>
                            router.push(
                              `/${product.productDetailsPage}/${product.slug}`
                            )
                          }
                        >
                          التفاصيل
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>

              <tbody style={{ maxWidth: "1rem" }}>
                <tr>
                  <td className={styles.titleTable}>الوصف</td>
                  {compareItems.map(product => (
                    <td key={product.id} className={styles.borderBottomTitle}>
                      <div className={styles.containerDescription}>
                        <p className={styles.description}>
                          {product.description}
                        </p>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td className={styles.titleTable}>التوفر</td>
                  {compareItems.map(product => (
                    <td key={product.id} className={styles.borderBottomTitle}>
                      {product.isAvailable === true ? (
                        <p className={styles.inStockText}>متوفر</p>
                      ) : (
                        <p className={styles.outOfStockText}>غير متوفر</p>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td className={styles.titleTable}>نوع القسم</td>
                  {compareItems.map(product => (
                    <td key={product.id} className={styles.borderBottomTitle}>
                      <p className={styles.productType}> {product.type} </p>
                    </td>
                  ))}
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td className={styles.titleTable}> بلد المنشأ </td>
                  {compareItems.map(product => (
                    <td key={product.id} className={styles.borderBottomTitle}>
                      <p className={styles.productMade}>{product.madeIn}</p>
                    </td>
                  ))}
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td className={styles.titleTable}> الألوان </td>
                  {compareItems.map(product => (
                    <td key={product.id} className={styles.borderBottomTitle}>
                      <p className={styles.productColors}> {product.color} </p>
                    </td>
                  ))}
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td className={styles.titleTable}> القياسات المتوفرة</td>
                  {compareItems.map(product => (
                    <td key={product.id} className={styles.borderBottomTitle}>
                      <p className={styles.productColors}>
                        {product.S && "S , "} {product.M && "M , "}
                        {product.L && "L , "}
                        {product.XL && "XL , "} {product.XXL && "2XL , "}
                        {product.XXXL && "3XL "}
                      </p>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          ) : (
            <div data-aos="fade-out" className={styles.noProductsAddedText}>
              <h3>لا يوجد منتجات مضافة</h3>
              <p>أضف بعض المنتجات للمقارنة</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
