import styles from "@/styles/ShippingInfoForm.module.css";
import { useContext, useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Badge from "@mui/material/Badge";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreSharp";

/*----------------------Context--------------------------*/
import { BagContext } from "@/context/BagContext";
/*-------------------------X-----------------------------*/

/*-----------------------Hooks---------------------------*/
import useInputField from "@/Hooks/useInputField";
/*-------------------------X-----------------------------*/

export default function ShippingInfoForm({ currentUser }) {
  const { bag } = useContext(BagContext);
  const { items = [] } = bag;

  const [city, setCity] = useState("عمان");

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  /*-------------State for Input register--------------*/
  const [values, setValues] = useState({
    email: `${currentUser.email === undefined ? "" : currentUser.email}`,
    firstName: `${currentUser.firstName || ""}`,
    lastName: `${currentUser.lastName || ""}`,
    address: `${currentUser.address || ""}`,
    building: `${currentUser.building || ""}`,
    phone: `${currentUser.phone || ""}`,
    amount: bag.totalBag,
  });

  const handleChangeInput = (evnt) => {
    const { name, value } = evnt.target;
    setValues({ ...values, [name]: value });
  };

  // const [email, handleChangeInput, resetEmail] = useInputField("");
  // const [phone, handleChangeInput, resetPhone] = useInputField("");
  // const [firstName, handleChangeInput, resetFirstName] = useInputField("");
  // const [lastName, handleChangeInput, resetLastName] = useInputField("");
  // const [address, handleChangeInput, resetAddress] = useInputField("");
  // const [building, handleChangeInput, resetBuilding] = useInputField("");

  /*------------------------X-----------------------*/

  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    console.log("submit....");
  };

  return (
    <div className={styles.main}>
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
                    value={city}
                    onChange={handleChangeCity}
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

              <button className={styles.confirmOrderBtn}>تأكيد الطلب</button>
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
              <button className={styles.editBagBtn}>تعديل الحقيبة</button>
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
              <p> {city === "عمان" ? "2.50" : "3.50"} JD</p>
              <p style={{ color: "red" }}> 0 JD</p>
              <p>
                {city === "عمان" ? bag.totalBag + 2.5 : bag.totalBag + 3.5} JD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
