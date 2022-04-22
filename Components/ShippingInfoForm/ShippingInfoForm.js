import styles from "@/components/ShippingInfoForm/ShippingInfoForm.module.css";
import {useContext, useEffect, useState} from "react";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {API_URL} from "@/config/index";
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
import {GrFormNext} from "react-icons/gr";
import {CgSpinnerTwoAlt} from "react-icons/cg"
import emailjs from "emailjs-com";
import ErrorComponent from "@/components/ErrorComponent/ErrorComponent";
import qs from "qs";

/*----------------------Context--------------------------*/
import {BagContext} from "@/context/BagContext";
import {ShippingInfoContext} from "@/context/ShippingInfoContext";
import router from "next/router";
/*-------------------------X-----------------------------*/

export default function ShippingInfoForm({currentUser, token}) {

    const [orderNumber] = useState(
        parseInt(Date.now() * Math.random())
            .toString()
            .substring(0, 5)
    );
    const todayDate = new Date().toISOString().slice(0, 10);

    const {bag} = useContext(BagContext);
    const {items = []} = bag;

    const {addToShippingInfo} = useContext(ShippingInfoContext);

    const idImageProducts = items.map(product => product.images[0].id);
    const detailsOrder = items.map(
        product =>
            `{#Name: ${product.name} ${product.size !== undefined ? ", Size:" : ""} ${
                product.size !== undefined ? product.size : ""
            }} `
    );

    const [isLoading, setIsLoading] = useState(false)
    const [discountInput, setDiscountInput] = useState("");
    const [discount, setDiscount] = useState("")
    const handleChangeDiscountInput = evnt => {
        setDiscountInput(evnt.target.value);
    };


    const [values, setValues] = useState({
        email: `${currentUser.email || ""}`,
        firstName: `${currentUser.firstName || ""}`,
        lastName: `${currentUser.lastName || ""}`,
        address: `${currentUser.address || ""}`,
        building: `${currentUser.building || ""}`,
        phone: `${currentUser.phone || ""}`,
        additionalInfo: "",
        city: ""
    });

    const handleChangeInput = evnt => {
        const {name, value} = evnt.target;
        setValues({...values, [name]: value});
    };

    const calculateDeliveryFees = () => {
        let DeliveryFees;
        (values.city === "عمان" || values.city === "الزرقاء") ? DeliveryFees = 3 : DeliveryFees = 5;
        if (values.city === "") return 0;
        return DeliveryFees;
    }

    const calculateDiscountValue = () => {
        if (!discount) return;
        if (new Date().toISOString().slice(0, 10) >= discount.expireDate) return; // discount expired
        return (((discount.discountValue) / 100) * (bag.totalBag + calculateDeliveryFees())).toFixed(2);
    }

    const getDiscount = async () => {
        if (discountInput === "") return;
        setIsLoading(true);
        const query = qs.stringify({
            _where: {
                _or: [
                    {discount: discountInput},
                ],
            },
        });
        const res = await fetch(`${API_URL}/discounts?${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const product = await res.json();
        setDiscount(product[0]);
        setIsLoading(false);
    }

    useEffect(() => {
        ValidatorForm.addValidationRule("isPhoneNumber", (value) => {
            return !(value.length > 10 || value.length < 10);
        });
    });

    useEffect(() => {
        ValidatorForm.addValidationRule("isLocalNumber", (value) => {
            let firstThreeNumber = value.slice(0, 3)
            return !!(firstThreeNumber.match("078")
                || firstThreeNumber.match("079")
                || firstThreeNumber.match("077"));
        });
    });

    const getHeaders = () => {
        if (token)
            return {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        return {
            "Content-Type": "application/json"
        }
    }


    const sendEmail = (evnt) => {
        emailjs
            .sendForm(
                "service_3c1s0le",
                "template_a6sto4t",
                evnt.target,
                "user_y4snMVOIayDWYkwH6dS0G"
            )
            .catch(err => console.log(err));
    }
    const addOrderToShippingInfo = async () => {
        addToShippingInfo(
            bag,
            values.firstName,
            values.lastName,
            values.address,
            values.phone,
            `UN${orderNumber}`,
            values.city,
            todayDate,
            TotalBag(),
            calculateDeliveryFees(),
            calculateDiscountValue()
        );
        await router.push("/payment/invoice-order");
    }
    const createNewOrder = async () => {
        try {
            await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({
                    ...values,
                    detailsOrder: `${detailsOrder}`,
                    orderTotal: `${TotalBag()}`,
                    image1: `${idImageProducts[0] || ""}`,
                    image2: `${idImageProducts[1] || ""}`,
                    image3: `${idImageProducts[2] || ""}`,
                    image4: `${idImageProducts[3] || ""}`,
                    orderNumber: `UN${orderNumber}`,
                    dateDelivered: `${todayDate}`,
                    numberOfItems: `${bag.itemsCount}`,
                    discountValue: `${calculateDiscountValue()}`
                })
            });
        } catch (err) {
            console.log(err)
        }

    }
    const turnDiscountIntoExpired = async () => {
        try {
            await fetch(`${API_URL}/discounts/${discount.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({published_at: null})
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (evnt) => {
        evnt.preventDefault();
        sendEmail(evnt)
        await createNewOrder()
        await addOrderToShippingInfo()
        if (discount) await turnDiscountIntoExpired()
    };

    const TotalBag = () => {
        if (calculateDiscountValue() === undefined) {
            return bag.totalBag + calculateDeliveryFees()
        } else {
            return (bag.totalBag + calculateDeliveryFees()) - calculateDiscountValue()
        }
    }

    return (
        <>
            {items.length !== 0 ? (
                <div className={styles.main}>
                    <nav data-aos="fade-right"
                         className={styles.mainPageNav}
                    >
                        <ul className={styles.containerPageNav}>
                            <li>
                                <Link href="/products/shopping-bag">
                                    <a className={styles.LinkPage}>حقيبة التسوق</a>
                                </Link>
                            </li>
                            <GrFormNext className={styles.nextIcon}/>

                            <li>
                                <Link href="/account/checkout-login">
                                    <a className={styles.LinkPage}>تسجيل الدخول</a>
                                </Link>
                            </li>

                            <GrFormNext className={styles.nextIcon}/>
                            <li>معلومات التوصيل</li>
                            <GrFormNext className={styles.nextIcon}/>
                            <li className={styles.otherLink}>تأكيد الطلب</li>
                        </ul>
                    </nav>

                    <div className={styles.container}>
                        <div data-aos="fade-in"
                             className={styles.containerShippingBox}
                        >
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
                                        style={{margin: "0 0.8rem 0.5rem  0"}}
                                    />
                                    <TextValidator
                                        type="number"
                                        name="phone"
                                        fullWidth
                                        value={values.phone}
                                        onChange={handleChangeInput}
                                        variant="standard"
                                        label="رقم الهاتف"
                                        validators={[
                                            "required",
                                            "isPhoneNumber",
                                            "isLocalNumber",
                                        ]}
                                        errorMessages={[
                                            "!! لا يمكنك ترك هذا الحقل فارغاً",
                                            "!! رقم الهاتف يجب أن يتكون من 10 أرقام فقط",
                                            "(078 , 079, 077) رقم الهاتف يجب أن يبدأ ب",
                                        ]}
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
                                            style={{margin: "0 0.8rem 0  0"}}
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
                                            sx={{width: "50%", minWidth: 120}}
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
                                            style={{margin: "0.25rem 0 0 0.8rem"}}
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
                                        style={{margin: "0.25rem 0 0 0"}}
                                    />

                                    <textarea
                                        placeholder="أدخل ملاحظاتك هنا"
                                        name="additionalInfo"
                                        className={styles.textArea}
                                        onChange={handleChangeInput}
                                        value={values.additionalInfo}
                                    />

                                    <button type="submit"
                                            className={styles.confirmOrderBtn}
                                    >
                                        تأكيد الطلب
                                    </button>
                                </ValidatorForm>
                            </div>
                        </div>

                        <div data-aos="fade-in"
                             className={styles.containerSummaryBagBox}
                        >
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={
                                        <ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{backgroundColor: "#fafafa"}}
                                >
                                    محتوى الحقيبة
                                </AccordionSummary>
                                <AccordionDetails style={{backgroundColor: "#fafafa"}}>
                                    <p className={styles.ItemsCountText}>
                                        يوجد {bag.itemsCount} عناصر في حقيبة التسوق الخاصة بك{" "}
                                    </p>
                                    <div className={styles.containerOrderInfo}>
                                        {items.map(item => (
                                            <div key={item.id}>
                                                <div className={styles.productContainer}>
                                                    <div className={styles.containerImgAndName}>
                                                        <Badge badgeContent={item.qty}
                                                               color="error"
                                                        >
                                                            <img
                                                                src={item.images[0].url}
                                                                width={60}
                                                                height={70}
                                                                alt="product-image"
                                                            />
                                                        </Badge>
                                                        <div className={styles.productNameAndColor}>
                                                            <p className={styles.productName}>{item.name}</p>
                                                            <div className={styles.containerColorAndSize}>
                                                                <span className={styles.productSize}>
                                                                    {item.size} /{" "}
                                                                </span>
                                                                <span className={styles.productColor}>
                                                                    {item.color}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className={styles.productPrice}>{item.price} JD</p>
                                                </div>
                                                <hr/>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="/products/shopping-bag">
                                        <button className={styles.editBagBtn}>تعديل الحقيبة</button>
                                    </Link>
                                </AccordionDetails>
                            </Accordion>

                            <div className={styles.containerCouponDiscount}>
                                <input
                                    type="text"
                                    readOnly={!token && true}
                                    value={discountInput}
                                    onChange={handleChangeDiscountInput}
                                    placeholder="أدخل كود الخصم هنا"
                                    className={styles.discountInput}
                                />
                                {isLoading === true ? (
                                    <CgSpinnerTwoAlt className={styles.rotating}/>
                                ) : (
                                    <button onClick={() => getDiscount()}
                                            className={styles.discountBtn}
                                    >تطبيق
                                    </button>
                                )}
                            </div>
                            {!token && (
                                <>
                                    <p className={styles.discountText}>
                                        نعتذر لا يمكنك تطبيق الخصم ما لم تكن مسجل مسجل حساب لدينا
                                    </p>
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <Link href="/account/checkout-login"
                                              passHref={true}
                                        >
                                            <button className={styles.loginBtn}> تسجيل الدخول</button>
                                        </Link>
                                        <Link href="/account/register"
                                              passHref={true}
                                        >
                                            <button className={styles.registerBtn}> إنشاء حساب</button>
                                        </Link>
                                    </div>
                                </>
                            )}
                            {discount === undefined && discountInput !== "" && (
                                <p className={styles.discountText}>
                                    نعتذر يبدو أن كود الخصم الذي أدخلته غير صالح أو أنه مستخدم بالفعل
                                </p>
                            )}

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
                                        {calculateDeliveryFees()}{" "}
                                        JD
                                    </p>
                                    <p>
                                        <span style={{color: "red"}}>{calculateDiscountValue() || 0}</span>{" "}
                                        JD
                                    </p>
                                    <p>{TotalBag()} JD</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <ErrorComponent
                    reaction="OOPS!"
                    statusError="405 - Not Allowed"
                    ErrorMessage="نعتذر لا يمكنك إدخال معلومات الشحن وسلة التسوق الخاصة بك فارغة"
                    buttonTxt="الرجوع للقائمة الرئيسية"
                    buttonUrl=""
                />
            )}
        </>
    );
}