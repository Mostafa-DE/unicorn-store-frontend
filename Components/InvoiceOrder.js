import styles from "@/styles/InvoiceOrder.module.css";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ShippingInfoContext } from "@/context/ShippingInfoContext";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";

export default function InvoiceOrderPage({ token }) {
  const router = useRouter();
  const { shippingInfo } = useContext(ShippingInfoContext);
  const { shippingItems = [] } = shippingInfo;
  console.log(shippingItems);

  useEffect(() => {
    window.localStorage.removeItem("shoppingBag");
  }, []);

  const printDocument = () => {
    const input = document.getElementById("invoicePdf");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 15, 0, 180, 150);
      pdf.save("رقم الطلب.pdf");
    });
  };

  const alertMessageNotLoggedIn = () => {
    Swal.fire({
      title: "نعتذر لا يمكن إتمام طلبك",
      text:
        " أنت لا تمتلك حساب أو غير مسجل دخولك لذلك لا يمكن عرض سجل الطلبات, إذا كنت تريد تتبع طلبك يرجى تحميل رقم الطلب من خلال الضغط على زر تحميل رقم الطلب وإرسالة لنا عبر أحد وسائل التواصل المعتمدة لدينا",
      icon: "error",
      confirmButtonColor: "#fb9aa7",
      confirmButtonText: "حسناً",
      showClass: {
        popup: "animate__animated animate__flipInX"
      },
      hideClass: {
        popup: "animate__animated animate__flipOutX"
      }
    });
  };

  const headBagInfo = ["معلومات الطلب", "السعر", "الكمية", "المجموع"];

  const headShippingInfo = [
    "الإسم",
    "العنوان",
    "الهاتف",
    "المحافظة",
    "التوصيل",
    "الخصم",
    "المجموع"
  ];

  return (
    <div data-aos="fade-in" className={styles.main}>
      <div className={styles.container}>
        <div id="invoicePdf" className={styles.containerSuccessfully}>
          <IoMdCheckmarkCircleOutline className={styles.checkIcon} />
          <p className={styles.thnxText}>
            شكراً لك !! لقد تم استلام طلبك بنجاح
          </p>
          <p className={styles.orderNumText}>رقم الطلب الخاص بك</p>
          {shippingItems.map(product => (
            <p
              key={product.orderNumber}
              className={styles.orderNumber}
            >{`" ${product.orderNumber} "`}</p>
          ))}

          <p className={styles.deliveryNote}>
            يرجى العلم أن التوصيل يحتاج إلى فترة عمل تتراوح ما بين 24-48 ساعة من
            تاريخ تثبيت الطلب
          </p>
        </div>
        <TableContainer sx={{ maxWidth: "1000px", backgroundColor: "#fafafa" }}>
          <p className={styles.detailsBagText}>تفاصيل الحقيبة</p>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {headBagInfo.map((item, indx) => (
                  <TableCell key={indx} align="center">
                    <span>{item}</span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {shippingItems.map(shippingItem => (
              <TableBody key={shippingItem.orderNumber}>
                {shippingItem.items.map(product => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="product">
                      <span>{product.name}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{product.price} JD</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{product.qty}</span>
                    </TableCell>
                    <TableCell align="center">
                      <span>{product.price * product.qty} JD</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ))}
          </Table>
        </TableContainer>

        <TableContainer
          sx={{
            maxWidth: "1000px",
            backgroundColor: "#fafafa",
            margin: "2rem 0 0 0"
          }}
        >
          <p className={styles.detailsShippingText}>معلومات التوصيل</p>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {headShippingInfo.map((item, indx) => (
                  <TableCell key={indx} align="center">
                    <span>{item}</span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {shippingItems.map(shippingItem => (
                <TableRow
                  key={shippingItem.orderNumber}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="product">
                    <span>{`${shippingItem.firstName} ${shippingItem.lastName}`}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{shippingItem.address}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{shippingItem.phone}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{shippingItem.city}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{shippingItem.DeliveryFees} JD</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>{shippingItem.discountValue || "0"} JD</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      {shippingItem.totalBag +
                        shippingItem.DeliveryFees -
                        shippingItem.discountValue}{" "}
                      JD
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.containerBtns}>
          <div className={styles.containerHomeBtn}>
            <Link href="/">
              <button className={styles.homeBtn}> العودة إلى الرئيسية </button>
            </Link>
          </div>
          <div className={styles.containerPdfAndHistoryBtns}>
            <button onClick={printDocument} className={styles.pdfBtn}>
              طباعة رقم الطلب
            </button>
            <button
              onClick={
                token !== null
                  ? () => router.push("/account/dashboard-user")
                  : () => alertMessageNotLoggedIn()
              }
              className={styles.historyBtn}
            >
              سجل الطلبات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
