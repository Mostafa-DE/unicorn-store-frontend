import styles from "@/styles/ShippingInfoForm.module.css";
import { useContext, useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { API_URL } from "@/config/index";
import Link from "next/link";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Badge from "@mui/material/Badge";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreSharp";
import { GrFormNext } from "react-icons/gr";

/*----------------------Context--------------------------*/
import { BagContext } from "@/context/BagContext";
import { ShippingInfoContext } from "@/context/ShippingInfoContext";
import router from "next/router";
/*-------------------------X-----------------------------*/

export default function ShippingInfoForm({ currentUser, token }) {
  const randNumbers = () =>
    parseInt(Date.now() * Math.random())
      .toString()
      .substring(0, 5);

  const orderNumber = randNumbers();
  const todayDate = new Date().toISOString().slice(0, 10);

  // shopping bag context
  const { bag } = useContext(BagContext);
  const { items = [] } = bag;
  // xxxxxxxxxxxxxxxxxxxx

  // shipping infornation context
  const { shippingInfo, addToShippingInfo } = useContext(ShippingInfoContext);
  const { shippingItems = [] } = shippingInfo;
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxx

  const idImageProducts = items.map((product) => product.images[0].id);
  const detailsOrder = items.map(
    (product) =>
      `{#Name: ${product.name} ${product.size !== undefined ? ", Size:" : ""} ${
        product.size !== undefined ? product.size : ""
      }} `
  );

  /*-------------State for Input register--------------*/
  const [values, setValues] = useState({
    email: `${currentUser.email || ""}`,
    firstName: `${currentUser.firstName || ""}`,
    lastName: `${currentUser.lastName || ""}`,
    address: `${currentUser.address || ""}`,
    building: `${currentUser.building || ""}`,
    phone: `${currentUser.phone || ""}`,
    additionalInfo: "",
    city: "",
  });

  const handleChangeInput = (evnt) => {
    const { name, value } = evnt.target;
    setValues({ ...values, [name]: value });
  };
  let TotalBag;

  if (values.city === "عمان" || values.city === "الزرقاء") {
    TotalBag = bag.totalBag + 3;
  } else {
    TotalBag = bag.totalBag + 5;
  }
  /*------------------------X-----------------------*/

  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    if (token !== null) {
      try {
        fetch(`${API_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...values,
            detailsOrder: `${detailsOrder}`,
            orderTotal: `${TotalBag}`,
            image1: `${idImageProducts[0] || ""}`,
            image2: `${idImageProducts[1] || ""}`,
            image3: `${idImageProducts[2] || ""}`,
            image4: `${idImageProducts[3] || ""}`,
            orderNumber: `#${orderNumber}`,
            dateDelivered: `${todayDate}`,
            numberOfItems: `${bag.itemsCount}`,
          }),
        });
        addToShippingInfo(
          bag,
          values.firstName,
          values.lastName,
          values.address,
          values.phone,
          `#${orderNumber}`,
          values.city,
          todayDate
        );
        router.push("/payment/invoice-order");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        fetch(`${API_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            detailsOrder: `${detailsOrder}`,
            orderTotal: `${TotalBag}`,
            image1: `${idImageProducts[0] || ""}`,
            image2: `${idImageProducts[1] || ""}`,
            image3: `${idImageProducts[2] || ""}`,
            image4: `${idImageProducts[3] || ""}`,
            orderNumber: `#${orderNumber}`,
            DateDelivered: `${todayDate}`,
            numberOfItems: `${bag.itemsCount}`,
          }),
        });
        addToShippingInfo(
          bag,
          values.firstName,
          values.lastName,
          values.address,
          values.phone,
          `#${orderNumber}`,
          values.city,
          todayDate
        );
        router.push("/payment/invoice-order");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.main}>
      <nav className={styles.mainPageNav}>
        <ul className={styles.containerPageNav}>
          <li>
            <Link href="/products/shopping-bag">
              <a className={styles.LinkPage}>حقيبة التسوق</a>
            </Link>
          </li>
          <GrFormNext className={styles.nextIcon} />

          <li>
            <Link href="/account/login">
              <a className={styles.LinkPage}>تسجيل الدخول</a>
            </Link>
          </li>

          <GrFormNext className={styles.nextIcon} />
          <li>معلومات التوصيل</li>
          <GrFormNext className={styles.nextIcon} />
          <li className={styles.otherLink}>تأكيد الطلب</li>
        </ul>
      </nav>
      <div className={styles.container}>
        <div className={styles.containerShippingBox}>
          <p className={styles.shippingInfoText}>معلومات التوصيل</p>
          <div className={styles.containerAllInput}>
            <ValidatorForm onSubmit={handleSubmit}>
              <TextValidator
                type="email"
                name="email"
                fullWidth
                onChange={handleChangeInput}
                value={values.email}
                variant="standard"
                label="البريد الإلكتروني"
                validators={["required"]}
                errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                style={{ margin: "0 0.8rem 0.5rem  0" }}
              />
              <TextValidator
                type="number"
                name="phone"
                fullWidth
                value={values.phone}
                onChange={handleChangeInput}
                variant="standard"
                label="رقم الهاتف"
                validators={["required"]}
                errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
              />

              <div className={styles.firstAndLastNameInput}>
                <TextValidator
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChangeInput}
                  variant="standard"
                  label="الإسم الأخير"
                  validators={["required"]}
                  errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                  style={{ margin: "0 0.8rem 0  0" }}
                />
                <TextValidator
                  type="text"
                  name="firstName"
                  onChange={handleChangeInput}
                  value={values.firstName}
                  variant="standard"
                  label="الإسم الأول"
                  validators={["required"]}
                  errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                />
              </div>

              <div className={styles.cityAndBuildingInput}>
                <FormControl
                  variant="standard"
                  sx={{ width: "50%", minWidth: 120 }}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    المدينة
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={values.city}
                    onChange={handleChangeInput}
                    name="city"
                    required
                  >
                    <MenuItem value={"عمان"}>عمان</MenuItem>
                    <MenuItem value={"الزرقاء"}>الزرقاء</MenuItem>
                    <MenuItem value={"البلقاء"}>البلقاء</MenuItem>
                    <MenuItem value={"جرش"}>جرش</MenuItem>
                    <MenuItem value={"الطفيلة"}>الطفيلة</MenuItem>
                    <MenuItem value={"عجلون"}>عجلون</MenuItem>
                    <MenuItem value={"العقبة"}>العقبة</MenuItem>
                    <MenuItem value={"الكرك"}>الكرك</MenuItem>
                    <MenuItem value={"معان"}>معان</MenuItem>
                    <MenuItem value={"المفرق"}>المفرق</MenuItem>
                  </Select>
                </FormControl>
                <TextValidator
                  type="number"
                  name="building"
                  onChange={handleChangeInput}
                  value={values.building}
                  variant="standard"
                  label=" رقم العمارة"
                  validators={["required"]}
                  errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                  style={{ margin: "0.25rem 0 0 0.8rem" }}
                />
              </div>
              <TextValidator
                type="text"
                name="address"
                fullWidth
                onChange={handleChangeInput}
                value={values.address}
                variant="standard"
                label=" العنوان الكامل"
                validators={["required"]}
                errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                style={{ margin: "0.25rem 0 0 0" }}
              />

              <textarea
                placeholder="أدخل ملاحظاتك هنا"
                name="additionalInfo"
                className={styles.textarea}
                onChange={handleChangeInput}
                value={values.additionalInfo}
              ></textarea>

              <button type="submit" className={styles.confirmOrderBtn}>
                تأكيد الطلب
              </button>
            </ValidatorForm>
          </div>
        </div>

        <div className={styles.containerSummaryBagBox}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ backgroundColor: "#fafafa" }}
            >
              محتوى الحقيبة
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "#fafafa" }}>
              <p className={styles.ItemsCountText}>
                يوجد {bag.itemsCount} عناصر في حقيبة التسوق الخاصة بك{" "}
              </p>
              <div className={styles.containerOrderInfo}>
                {items.map((item) => (
                  <div key={item.id}>
                    <div className={styles.productContainer}>
                      <div className={styles.containerImgAndName}>
                        <Badge badgeContent={item.qty} color="error">
                          <img
                            src={item.images[0].url}
                            width={60}
                            height={70}
                          />
                        </Badge>
                        <div className={styles.productNameAndColor}>
                          <p className={styles.productName}>{item.name}</p>
                          <div className={styles.containerColorAndSize}>
                            <span className={styles.productSize}>
                              {item.size} /{" "}
                            </span>
                            <span className={styles.productColor}>
                              {item.color || "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className={styles.productPrice}>{item.price} JD</p>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
              <Link href="/products/shopping-bag">
                <button className={styles.editBagBtn}>تعديل الحقيبة</button>
              </Link>
            </AccordionDetails>
          </Accordion>
          <div className={styles.containerCoboneDiscount}>
            <button className={styles.discountBtn}>تفعيل</button>
            <input
              type="text"
              placeholder="أدخل كود الخصم هنا"
              className={styles.discountInput}
            />
          </div>
          <div className={styles.containetTotalAmountBox}>
            <div className={styles.allTotalPrices}>
              <p>السعر الفرعي</p>
              <p>أجور التوصيل</p>
              <p> قيمة الخصم</p>
              <p>السعر الإجمالي</p>
            </div>
            <div className={styles.allPrices}>
              <p>{bag.totalBag} JD</p>
              <p>
                {" "}
                {values.city === "عمان" || values.city === "الزرقاء"
                  ? "3"
                  : "5"}{" "}
                JD
              </p>
              <p style={{ color: "red" }}> 0 JD</p>
              <p>{TotalBag} JD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
