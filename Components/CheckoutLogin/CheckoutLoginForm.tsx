import styles from "@/components/CheckoutLogin/CheckoutLoginForm.module.css";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {AuthContext} from "@/context/AuthContext";
import useInputField from "@/Hooks/useInputField";
import useShowPassword from "@/Hooks/useShowPassword";
import {RiEyeLine} from "react-icons/ri";
import {RiEyeCloseLine} from "react-icons/ri";
import {FiAlertCircle} from "react-icons/fi";
import {GrFormNext} from "react-icons/gr";
import {CgSpinnerTwoAlt} from "react-icons/cg";
import {
    alertBenefitsToLogin,
    alertRememberMe,
    alertLoginFailed,
} from "@/components/CheckoutLogin/Alerts";
import {API_URL} from "@/config/index";
import {FaGoogle} from "react-icons/fa";

export default function LoginForm() {
    const router = useRouter();
    //TODO: add right types here
    // @ts-ignore
    const {login, error} = useContext(AuthContext);
    useEffect(() => {
        error && alertLoginFailed(error);
    }, [error]);

    const [email, handleChangeEmail] = useInputField();
    const [password, handleChangePassword] = useInputField();
    const [showPassword, handleShowPassword] = useShowPassword();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (evnt: React.FormEvent<Element>) => {
        evnt.preventDefault();
        setIsLoading(true);
        await login({email, password});
        setIsLoading(false);
    };
    const handleLoginGoogle = async () => {
        await router.push(`${API_URL}/connect/google`);
    };

    return (
        <>
            <nav className={styles.mainPageNav}>
                <ul className={styles.containerPageNav}>
                    <li>
                        <Link href="/products/shopping-bag" className={styles.LinkPage}>
                            حقيبة التسوق
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
                            <div className={styles.containerGoogleAndFacebookBtn}>
                                <button
                                    type="button"
                                    className={styles.googleBtn}
                                    onClick={handleLoginGoogle}
                                >
                                    <FaGoogle/>
                                </button>
                            </div>
                            <div className={styles.orText}>
                                <p>أو</p>
                            </div>
                            <TextValidator
                                type="email"
                                //TODO: add right types here
                                // @ts-ignore
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
                                    //TODO: add right types here
                                    // @ts-ignore
                                    onChange={handleChangePassword}
                                    variant="standard"
                                    label="الرقم السري"
                                    validators={["required"]}
                                    errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                                />
                                {showPassword === true ? (
                                    <RiEyeLine
                                        className={styles.iconShowPassword}
                                        //TODO: add right types here
                                        // @ts-ignore
                                        onClick={handleShowPassword}
                                    />
                                ) : (
                                    <RiEyeCloseLine
                                        className={styles.iconShowPassword}
                                        //TODO: add right types here
                                        // @ts-ignore
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
                                        onClick={alertRememberMe}
                                        className={styles.alertIcon}
                                    />
                                </label>
                            </div>

                            {isLoading === true ? (
                                <div className={styles.containerSpinner}>
                                    <CgSpinnerTwoAlt className={styles.rotating}/>
                                </div>
                            ) : (
                                <div>
                                    <button type="submit" className={styles.loginBtn}>
                                        تسجيل الدخول
                                    </button>
                                </div>
                            )}

                            <div>
                                <Link href="/account/forgot-password" className={styles.forgottenPassword}>
                                    نسيت كلمة المرور ؟؟
                                </Link>
                            </div>
                        </div>
                        <div className={styles.containerRegisterForm}>
                            <p className={styles.dontHaveAccountText}>
                                لا تريد إنشاء حساب ؟؟
                            </p>
                            <Link href="/payment/shipping-info" className={styles.signUpBtn}>
                                أكمل الطلب كضيف
                            </Link>
                            <span className={styles.orText}>أو</span>
                            <Link href="/account/register" className={styles.signUpBtn}>
                                انشاء حساب جديد
                            </Link>
                            <p className={styles.textMoreFeatures}>
                                سجل الآن لتحصل على ميزات إضافية, لمعرفة الميزات إضغط{" "}
                                <span onClick={alertBenefitsToLogin}>{"هنا"}</span>
                            </p>
                        </div>
                    </div>
                </ValidatorForm>
            </div>
        </>
    );
}
