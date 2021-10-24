import styles from "@/styles/InvoiceOrder.module.css";
import { useContext } from "react";
import { BagContext } from "@/context/BagContext";

export default function InvoiceOrder() {
  const { bag } = useContext(BagContext);
  const { items = [] } = bag;

  return (
    <div className={styles.main}>
      <div className="App container mt-5">
        {/* <button className="btn btn-primary">Export To PDF</button> */}
        <div id="divToPrint" className="m-3">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="d-flex flex-row p-2">
                  <div className={styles.containerLogo}>
                    <img src="/images/unicorn.png" width={100} height={100} />
                    <p>فاتورة مبيعات</p>
                  </div>
                </div>

                <div className="table-responsive p-2">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <div className={styles.containerNumOrderAndDate}>
                            <span className={styles.thnxText}>
                              مرحبًا !! شكرًا لك على التسوق من متجرنا وعلى طلبك,
                              نأمل أن تكون تجربتك رائعة
                            </span>
                            <div className={styles.numOrderAndDate}>
                              <span>رقم الطلب: #55555</span>
                              <span>تاريخ الطلب: 25-10-2021</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className={styles.containerClientInfo}>
                  <div className={styles.clientInfo}>
                    <h2></h2>
                  </div>
                </div>
                <div className="products p-2">
                  <table className="table table-borderless">
                    <tbody>
                      <tr className={styles.add}>
                        <td>Description</td>
                        <td>Days</td>
                        <td>Price</td>
                        <td className="text-center">Total</td>
                      </tr>
                      {items.map((product) => (
                        <tr key={product.id} className={styles.content}>
                          <td> {product.name} </td>
                          <td>15</td>
                          <td>{product.price} JD</td>
                          <td className="text-center">{bag.totalBag} JD</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <hr />
                <div className="products p-2">
                  <table className="table table-borderless">
                    <tbody>
                      <tr className={styles.add}>
                        <td></td>
                        <td>Subtotal</td>
                        <td>GST(10%)</td>
                        <td className="text-center">Total</td>
                      </tr>
                      <tr className={styles.content}>
                        <td></td>
                        <td>$40,000</td>
                        <td>2,500</td>
                        <td className="text-center">$42,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr />
                <div className="address p-2">
                  <table className="table table-borderless">
                    <tbody>
                      <tr className={styles.add}>
                        <td>Bank Details</td>
                      </tr>
                      <tr className={styles.content}>
                        <td>
                          {" "}
                          Bank Name : ADS BANK <br /> Swift Code : 00220022{" "}
                          <br /> Account Holder : Jassa Pepper <br /> Account
                          Number : 6953PO789 <br />{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
