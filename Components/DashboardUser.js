import styles from "@/styles/DashboardUser.module.css";
import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { AiOutlineLine } from "react-icons/ai";
import { VscClose } from "react-icons/vsc";

export default function DashboardUser({ userOrders }) {
  function Row({ order }) {
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <div
              className={styles.containerDetailsIcon}
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <span className={styles.hide}>
                  <VscClose />
                </span>
              ) : (
                <span className={styles.details}>تفاصيل</span>
              )}
            </div>
          </TableCell>
          <TableCell align="center">
            <span>{`${order.firstName} ${order.lastName}`}</span>
          </TableCell>
          <TableCell align="center">
            <span>{order.address}</span>
          </TableCell>
          <TableCell align="center">
            <span>{order.orderNumber}</span>
          </TableCell>
          <TableCell align="center">
            <span>{order.dateDelivered}</span>
          </TableCell>
          <TableCell align="center">
            <span>{order.orderTotal} JD</span>
          </TableCell>
          <TableCell align="center">
            {order.isDelivered === false ? (
              <span className={styles.pending}>قيد الإنتظار</span>
            ) : (
              <span className={styles.delivered}>تم الإستلام</span>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  <spna>تفاصيل الطلب</spna>
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="center">
                        <span>التفاصيل</span>
                      </TableCell>
                      <TableCell align="center">
                        <span>عدد العناصر</span>
                      </TableCell>
                      <TableCell align="center">
                        <span>ملاحظات</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={order.date}>
                      <TableCell component="th" scope="row">
                        <img
                          src={order.image1[0].formats.thumbnail.url}
                          className={styles.img}
                        />
                        {order.image2.length !== 0 && (
                          <img
                            className={styles.img}
                            src={order.image2[0].formats.thumbnail.url}
                          />
                        )}
                        {order.image3.length !== 0 && (
                          <img
                            className={styles.img}
                            src={order.image3[0].formats.thumbnail.url}
                          />
                        )}
                        {order.image4.length !== 0 && (
                          <img
                            className={styles.img}
                            src={order.image4[0].formats.thumbnail.url}
                          />
                        )}
                      </TableCell>
                      <TableCell align="center" className={styles.detailsOrder}>
                        <span>{`${order.detailsOrder}`}</span>
                      </TableCell>
                      <TableCell align="center">
                        <span>{order.numberOfItems}</span>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={styles.additionalInfo}
                      >
                        <span>{`${
                          order.additionalInfo !== ""
                            ? order.additionalInfo
                            : "-"
                        }`}</span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <div className={styles.main}>
      <div className="containerTitle">
        <h1 className="h1Title"> سجل الطلبات</h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      {userOrders.length !== 0 ? (
        <>
          <TableContainer
            style={{
              backgroundColor: "#fafafa",
            }}
            className={styles.mainTableContainer}
            component={Paper}
          >
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">
                    <span>بواسطة</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>العنوان</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>رقم الطلب</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>تاريخ الطلب</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>التكلفة الكلية</span>
                  </TableCell>
                  <TableCell align="center">
                    <span>حالة الطلب</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userOrders.map((order) => (
                  <Row key={order.id} order={order} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <div className={styles.containerShoppingBagEmpty}>
          <h1>يبدو انه لا يوجد لديك سجل للطلبات</h1>
          <p>ستظهر هنا جميع الطلبات التي تقوم بها في المستقبل</p>
          <Link href="/">
            <button className={styles.continueShoppingBtn}>أكمل التسوق</button>
          </Link>
        </div>
      )}
    </div>
  );
}
