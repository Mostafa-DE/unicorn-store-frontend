import styles from "@/components/CheckoutLogin/CheckoutLoginForm.module.css";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import {useContext, useEffect} from "react";
import Link from "next/link";
import {AuthContext} from "@/context/AuthContext";
import useInputField from "@/Hooks/useInputField";
import useShowPassword from "@/Hooks/useShowPassword";
import {RiEyeLine} from "react-icons/ri";
import {RiEyeCloseLine} from "react-icons/ri";
import {FiAlertCircle} from "react-icons/fi";
import {GrFormNext} from "react-icons/gr";
import Swal from "sweetalert2";

export default function LoginForm() {
    // Auth context
    const {login, error} = useContext(AuthContext);
    useEffect(() => {
        error &&
        new Swal({
            title: error,
            icon: "error",
            confirmButtonColor: "#fb9aa7",
            confirmButtonText: "حسناً"
        });
    }, [login, error]);
    // xxxxxxxxxxxx

    const [email, handleChangeEmail, resetEmail] = useInputField("");

    const [password, handleChangePassword, resetPassword] = useInputField("");

    const [showPassword, handleShowPassword] = useShowPassword(false);

    const handleSubmit = evnt => {
        evnt.preventDefault();
        login({email, password});
        resetPassword();
        resetEmail();
    };


    const alertBenefitsLogin = () => {
        Swal.fire({
            title: "الميزات التي ستتمتع بها بمجرد إنشاء حساب ",
            html: `
             <p> الطلب بشكل أسرع في المستقبل دون الحاجة لإدخال البيانات في كل مرة تنوي بها الطلب</p>
            <hr />
            <p>سجل الطلبات لتتبع طلباتك في المستقبل في أي وقت تريده</p>
            <hr />
            <p>الوصول لقائمة المفضلة لديك وإمكانية حفظ المنتجات التي تنوي شرائها في المستقبل</p>
            <hr />
             <p>الحصول على متابعة أسهل من قبل الفريق المختص لدينا في حال واجهتك أي مشاكل في الموقع</p>
             <hr />
            <p>الحصول على خصومات مميزة خاصة</p>
            <hr />
            <p>إخطارك في  حال توفر عروض وخصومات حصرية على الموقع</p>
             `,
            customClass: "",
            icon: "info",
            confirmButtonText: "حسناً, لقد فهمت",
            confirmButtonColor: "#fb9aa7",
            footer: `<a href="https://wa.me/message/HRQFZDWSM3EUH1">أنا بحاجة إلى المساعدة</a> لم تتضح الأمور بشكل جيد`
        });
    };

    const alertRememberMe = () => {
        Swal.fire({
            icon: "warning",
            title: "👋 مرحباً",
            confirmButtonColor: "#fb9aa7",
            confirmButtonText: "حسناً",
            html: `<p>يرجى ملاحظة أننا نستخدم ملفات تعريف الارتباط للاحتفاظ بتسجيل الدخول الخاص بك لمدة أسبوع ، وبعد ذلك يتم تسجيل الخروج تلقائيًا ، إذا كنت لا تريد الاحتفاظ بتسجيل الدخول فيمكنك الضغط على خيار تسجيل الخروج من القائمة</p>`
        });
    };

    return (
        <>
            <nav className={styles.mainPageNav}>
                <ul className={styles.containerPageNav}>
                    <li>
                        <Link href="/products/shopping-bag">
                            <a className={styles.LinkPage}>حقيبة التسوق</a>
                        </Link>
                    </li>
                    <GrFormNext className={styles.nextIcon}/>
                    <li> تسجيل الدخول</li>
                    <GrFormNext className={styles.nextIcon}/>
                    <li className={styles.otherLink}>معلومات التوصيل</li>
                    <GrFormNext className={styles.nextIcon}/>
                    <li className={styles.otherLink}>تأكيد الطلب</li>
                </ul>
            </nav>

            <div className={styles.main}>
                <ValidatorForm onSubmit={handleSubmit}>
                    <div className={styles.container}>
                        <div className={styles.containerLoginForms}>
                            <div>
                                <p className={styles.textInformation}>
                                    يبدو أنك غير مسجل كمستخدم لدينا قم بتسجيل الدخول الآن للطلب
                                    بشكل أسرع
                                </p>
                            </div>
                            <TextValidator
                                type="email"
                                onChange={handleChangeEmail}
                                value={email}
                                fullWidth
                                variant="standard"
                                label="البريد الإلكتروني"
                                validators={["required"]}
                                errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                            />

                            <div className={styles.passwordInput}>
                                <TextValidator
                                    type={showPassword === true ? "text" : "password"}
                                    name="firstName"
                                    value={password}
                                    onChange={handleChangePassword}
                                    variant="standard"
                                    label="الرقم السري"
                                    validators={["required"]}
                                    errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                                />
                                {showPassword === true ? (
                                    <RiEyeLine
                                        className={styles.iconShowPassword}
                                        onClick={handleShowPassword}
                                    />
                                ) : (
                                    <RiEyeCloseLine
                                        className={styles.iconShowPassword}
                                        onClick={handleShowPassword}
                                    />
                                )}
                            </div>
                            <div className={`form-check mb-0 ${styles.checkBox} `}>
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    id="form2Example4"
                                    checked
                                    readOnly
                                />
                                <label className="form-check-label" htmlFor="form2Example4">
                                    تذكرني
                                    <FiAlertCircle
                                        onClick={() => alertRememberMe()}
                                        className={styles.alertIcon}
                                    />
                                </label>
                            </div>

                            <div className={styles.containerLoginBtn}>
                                <button type="submit" className={styles.loginBtn}>
                                    تسجيل الدخول
                                </button>
                            </div>

                            <div className={styles.containerForgottenPassword}>
                                <Link href="/account/forgot-password">
                                    <a className={styles.forgottenPassword}>
                                        نسيت كلمة المرور ؟؟
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.containerRegisterForm}>
                            <p className={styles.dontHaveAccountText}>
                                لا تريد إنشاء حساب ؟؟
                            </p>
                            <Link href="/payment/shipping-info">
                                <button className={styles.signUpBtn}>أكمل الطلب كضيف</button>
                            </Link>
                            <span className={styles.orText}>أو</span>
                            <Link href="/account/register">
                                <button className={styles.signUpBtn}> انشاء حساب جديد</button>
                            </Link>
                            <p className={styles.textMoreFeatures}>
                                سجل الآن لتحصل على ميزات إضافية, لمعرفة الميزات إضغط{" "}
                                <span onClick={() => alertBenefitsLogin()}>{"هنا"}</span>
                            </p>
                        </div>
                    </div>
                </ValidatorForm>
            </div>
        </>
    );
}