import styles from "@/components/LoginForm/LoginForm.module.css";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import {FormEvent, useContext, useEffect, useState} from "react";
import Link from "next/link";
import {AuthContext, IAuthContextProps} from "@/context/AuthContext";
import useInputField from "@/Hooks/useInputField";
import useShowPassword from "@/Hooks/useShowPassword";
import {RiEyeLine} from "react-icons/ri";
import {RiEyeCloseLine} from "react-icons/ri";
import {FiAlertCircle} from "react-icons/fi";
import {AiOutlineLine} from "react-icons/ai";
import {CgSpinnerTwoAlt} from "react-icons/cg";
import {alertRememberMe} from "@/helpers/AlertsAndDialogs/alertRememberMe";
import {DialogAlert} from "@/helpers/AlertsAndDialogs/DialogAlert";
import {alertBenefitsToLogin} from "@/helpers/AlertsAndDialogs/alertBenefitsToLogin";


export default function LoginForm() {
    const {login} = useContext<IAuthContextProps>(AuthContext);

    const [username, handleChangeUsername, resetUsername] = useInputField();
    const [password, handleChangePassword, resetPassword] = useInputField();
    const [showPassword, handleShowPassword] = useShowPassword();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (evnt: FormEvent) => {
        evnt.preventDefault();
        setIsLoading(true);
        const res = await login({username, password});
        if (!res.ok) {
            DialogAlert({
                title: "Something went wrong!!",
                body: res.errorMessage,
                icon: "error",
            })
            setIsLoading(false);
            return;
        }
        resetUsername();
        resetPassword();
        setIsLoading(false);
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
                            <TextValidator
                                type="text"
                                name="username"
                                onChange={handleChangeUsername}
                                value={username}
                                fullWidth
                                variant="standard"
                                label="إسم المستخدم"
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
                                <span onClick={() => alertBenefitsToLogin()}>{"هنا"}</span>
                            </p>
                        </div>
                    </div>
                </ValidatorForm>
            </div>
        </>
    );
}
