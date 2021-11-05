import styles from "@/styles/MyAccount.module.css";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";

export default function MyAccount({ userAccount, token }) {
  // get random quotation every reload :)
  const WelcomeArray = [
    " “ You look awesome today 😉 ” ",
    " “ You look incredible today 😉 ” ",
    " “ Stay safe 😍 ” ",
    " “ We hope that you fine 😍 ” ",
    " “ Be fine 🌹 ” ",
    " “ Be Strong 🌹 ” ",
    " “ Love the life you live, live the life you love 🌹 ”  ",
    " “ Enjoy in every moment in your life 😉 ”  ",
    ` “ Seize the days, ${userAccount.firstName} 😉 ”  `,
  ];
  const randWord = Math.floor(Math.random() * WelcomeArray.length);
  const words = WelcomeArray[randWord];
  const [getQuotation, setGetQuotation] = useState(words);
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div data-aos="zoom-in" className={styles.containerFirstBox}>
          <div className={styles.containerImg}>
            <img
              data-aos="fade-down"
              className={styles.img}
              src="/images/unicorn/women fashions.jpg"
              width={100}
            />
          </div>

          <div className={styles.containerText}>
            <h3 data-aos="fade-up">{userAccount.username} 👋 مرحباً</h3>
            <p data-aos="fade-up"> {getQuotation} </p>
          </div>

          <div data-aos="fade-right" className={styles.containerBtns}>
            <Link href="/account/dashboard-user">
              <button className={styles.orderHistoryBtn}>سجل طلباتك</button>
            </Link>
            <Link href="/products/shopping-bag">
              <button className={styles.shoppingBagBtn}>حقيبة التسوق</button>
            </Link>
          </div>
        </div>

        <div className={styles.containerSecondBox}>
          <TableContainer>
            <Table className={styles.containerTable} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    data-aos="fade-in"
                    className={styles.titleTable}
                    align="right"
                  >
                    تفاصيل الحساب
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableHead data-aos="fade-right">
                <TableRow>
                  <TableCell className={styles.fontFamily} align="left">
                    {userAccount.firstName}
                  </TableCell>
                  <TableCell className={styles.fontFamily} align="right">
                    الإسم الأول
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={styles.fontFamily} align="left">
                    {userAccount.lastName}
                  </TableCell>
                  <TableCell className={styles.fontFamily} align="right">
                    الإسم الأخير
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={styles.fontFamily} align="left">
                    {userAccount.username}
                  </TableCell>
                  <TableCell className={styles.fontFamily} align="right">
                    إسم المستخدم
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={styles.fontFamily} align="left">
                    {userAccount.email}
                  </TableCell>
                  <TableCell className={styles.fontFamily} align="right">
                    البريد الإلكتروني
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={styles.fontFamily} align="left">
                    {userAccount.address}
                  </TableCell>
                  <TableCell className={styles.fontFamily} align="right">
                    العنوان
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={styles.fontFamily} align="left">
                    {userAccount.city}
                  </TableCell>
                  <TableCell className={styles.fontFamily} align="right">
                    المدينة
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={styles.fontFamily} align="left">
                    {userAccount.phone}
                  </TableCell>
                  <TableCell className={styles.fontFamily} align="right">
                    رقم الهاتف الأساسي
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={styles.fontFamily} align="left">
                    {userAccount.deliveryPhone || "-"}
                  </TableCell>
                  <TableCell className={styles.fontFamily} align="right">
                    رقم هاتف للتوصيل
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={styles.fontFamily} align="left">
                    <span className={styles.accountActive}>فعال</span>
                  </TableCell>
                  <TableCell className={styles.fontFamily} align="right">
                    حالة الحساب
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
            {/* <button onClick={handleEditInput} className={styles.editBtn}>
              تعديل البيانات
            </button> */}
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
