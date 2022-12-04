import styles from "@/components/LoginForm/LoginForm.module.css";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import {useContext, useEffect, useState} from "react";
import Link from "next/link";
import {AuthContext} from "@/context/AuthContext";
import useInputField from "@/Hooks/useInputField";
import useShowPassword from "@/Hooks/useShowPassword";
import {RiEyeLine} from "react-icons/ri";
import {RiEyeCloseLine} from "react-icons/ri";
import {FiAlertCircle} from "react-icons/fi";
import {AiOutlineLine} from "react-icons/ai";
import {
    alertBenefitsLogin,
    alertRememberMe,
    alertLoginFailed,
} from "@/components/LoginForm/Alert";
import {useRouter} from "next/router";
import {FaGoogle} from "react-icons/fa";
import {API_URL} from "@/config/index";
import {CgSpinnerTwoAlt} from "react-icons/cg";

export default function LoginForm({rememberEmailUser}) {
    const router = useRouter();

    //TODO: add right types here
    // @ts-ignore
    const {login, error} = useContext(AuthContext);
    useEffect(() => {
        error && alertLoginFailed(error);
    }, [login, error]);

    const [email, setEmail] = useState(rememberEmailUser);
    const handleChangeEmail = (evnt) => {
        setEmail(evnt.target.value);
    };

    const [password, handleChangePassword, resetPassword] = useInputField();
    const [showPassword, handleShowPassword] = useShowPassword();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (evnt) => {
        evnt.preventDefault();
        setIsLoading(true);
        await login({email, password});
        //TODO: add right types here
        // @ts-ignore
        resetPassword();
        setIsLoading(false);
    };

    const handleLoginGoogle = async () => {
        await router.push(`${API_URL}/connect/google`);
    };

    useEffect(() => {
        window.localStorage.removeItem("wishBag");
    }, []);

    return (
        <>
            <div className="containerTitle">
                <h1 className="h1Title"> تسجيل الدخول </h1>
                <AiOutlineLine className="lineIcon"/>
            </div>
            <div className={styles.main}>
                <ValidatorForm onSubmit={handleSubmit}>
                    <div className={styles.container}>
                        <div className={styles.containerLoginForms}>
                            <div>
                                <p className={styles.textInformation}>
                                    الرجاء إدخال التفاصيل الخاصة بك أدناه لتسجيل الدخول إلى حسابك
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
                            {/*  //TODO: add right types here
                   // @ts-ignore */}
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
                                <Link href="/account/forgot-password"
                                      className={styles.forgottenPassword}
                                >
                                    نسيت كلمة المرور ؟؟
                                </Link>
                            </div>
                        </div>
                        <div className={styles.containerRegisterForm}>
                            <p className={styles.dontHaveAccountText}>
                                ليس لديك حساب بالفعل ؟؟
                            </p>
                            <Link href="/account/register" className={styles.signUpBtn}>
                                سجل الآن
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
