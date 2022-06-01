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
import {cities} from "@/components/ShippingInfoForm/Cities";

/*----------------------Context--------------------------*/
import {BagContext} from "@/context/BagContext";
import {ShippingInfoContext} from "@/context/ShippingInfoContext";
import router from "next/router";
/*-------------------------X-----------------------------*/

export default function ShippingInfoForm({currentUser, token}) {
    const unauthorizedUser = currentUser.statusCode;
    const orderNumber = (Date.now() * Math.random()).toString().substring(0, 6);
    const todayDate = new Date().toISOString().slice(0, 10);


    const {bag} = useContext(BagContext);
    const {addToShippingInfo} = useContext(ShippingInfoContext);
    const {items = []} = bag;


    const idImageProducts = items.map(product => product.images[0].id);
    const detailsOrder = items.map(
        product =>
            `{#Name: ${product.name} ${product.size !== undefined ? ", Size:" : ""} ${
                product.size !== undefined ? product.size : ""
            }} `
    );


    const [isLoading, setIsLoading] = useState(false);
    const [discountInput, setDiscountInput] = useState("");
    const [discount, setDiscount] = useState("")
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


    const handleChangeDiscountInput = evnt => {
        setDiscount("")
        setDiscountInput(evnt.target.value);
    };

    const handleChangeInput = evnt => {
        const {name, value} = evnt.target;
        setValues({...values, [name]: value});
    };


    const calculateDeliveryFees = () => {
        const {city} = values;
        const DeliveryFees = (city === "عمان" || city === "الزرقاء") ? 3 : 5;
        return values.city === "" ? 0 : DeliveryFees;
    }


    const calculateDiscountValue = () => {
        const expireDate = discount?.expireDate;
        const totalDiscount = (((discount?.discountValue) / 100) * (bag.totalBag + calculateDeliveryFees())).toFixed(2);
        if (!discount) return;
        if (todayDate >= expireDate) return;
        return totalDiscount;
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
        const discount = await res.json();
        setDiscount(discount[0]);
        setIsLoading(false);
        if(discount[0]?.user_discount?.id !== currentUser.id) return setDiscount(undefined);
    }

    const handleDiscountBtn = () => {
        if (discount) return setDiscount("")
        getDiscount();
    }


    useEffect(() => {
        ValidatorForm.addValidationRule("isPhoneNumber", (value) => {
            return !(value.length > 10 || value.length < 10);
        });
    }, [values.phone]);


    useEffect(() => {
        ValidatorForm.addValidationRule("isLocalNumber", (value) => {
            let firstThreeNumber = value.slice(0, 3)
            return !!(firstThreeNumber.match("078")
                || firstThreeNumber.match("079")
                || firstThreeNumber.match("077"));
        });
    }, [values.phone]);


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
                    image1: idImageProducts,
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
                            <div>
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
                                                {cities.map((city, idx) => (
                                                    <MenuItem key={idx}
                                                              value={city}
                                                    >
                                                        {city}
                                                    </MenuItem>
                                                ))}
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

                        <div data-aos="fade-in">
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={
                                        <ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{backgroundColor: "#fafafa"}}
                                >
                                    ({bag.itemsCount}) محتوى الحقيبة
                                </AccordionSummary>
                                <AccordionDetails style={{backgroundColor: "#fafafa"}}>
                                    <p className={styles.ItemsCountText}>
                                        حقيبة التسوق الخاصة بك
                                    </p>
                                    <div>
                                        {items.map((item, idx) => (
                                            <div key={idx}>
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
                                                            <Link href={`/${item.productDetailsPage}/${item.slug}`}>
                                                                <p className={styles.productName}>{item.name}</p>
                                                            </Link>
                                                            <div className={styles.containerColorAndSize}>
                                                                <span>
                                                                    {item.size}
                                                                </span>
                                                                {/*<span>*/}
                                                                {/*    {item.color}*/}
                                                                {/*</span>*/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className={styles.productPrice}>{item.price} JD</p>
                                                </div>
                                                <hr/>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.containerEditBtn}>
                                        <Link href="/products/shopping-bag">
                                            <button className={styles.editBagBtn}>تعديل الحقيبة</button>
                                        </Link>
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                            <div className={styles.containerCouponDiscount}>
                                <input
                                    type="text"
                                    readOnly={(unauthorizedUser || discount) && true}
                                    value={discountInput}
                                    onChange={handleChangeDiscountInput}
                                    placeholder="أدخل كود الخصم هنا"
                                    className={styles.discountInput}
                                />
                                {isLoading === true ? (
                                    <CgSpinnerTwoAlt className={styles.rotating}/>
                                ) : (
                                    <button onClick={handleDiscountBtn}
                                            className={styles.discountBtn}
                                    >
                                        {discount ? "إلغاء" : "تطبيق"}
                                    </button>
                                )}
                            </div>
                            {unauthorizedUser && (
                                <>
                                    <p className={styles.discountNotFoundText}>
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
                                <p className={styles.discountNotFoundText}>
                                    نعتذر يبدو أن كود الخصم الذي أدخلته غير صالح أو أنه مستخدم بالفعل
                                </p>
                            )}

                            {discount && discountInput !== "" && (
                                <p className={styles.discountFoundText}>
                                    {"🤩"}   تم تطبيق الخصم بنجاح {" "}{currentUser.username} تهانينا
                                </p>
                            )}

                            <div className={styles.containetTotalAmountBox}>
                                <div>
                                    <p>السعر الفرعي</p>
                                    <p>أجور التوصيل</p>
                                    <p> قيمة الخصم</p>
                                    <p>السعر الإجمالي</p>
                                </div>
                                <div>
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