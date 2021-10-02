import styles from "@/styles/LoginForm.module.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useContext, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "@/context/AuthContext";
import useInputField from "@/Hooks/useInputField";
import useShowPassword from "@/Hooks/useShowPassword";
import { useRouter } from "next/router";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { FiAlertCircle } from "react-icons/fi";
import { AiOutlineLine } from "react-icons/ai";

export default function LoginForm() {
  const router = useRouter();

  // Auth context
  const { login, error } = useContext(AuthContext);
  useEffect(() => {
    error && toast.error(error);
  });
  // xxxxxxxxxxxx

  const [email, handleChangeEmail, resetEmail] = useInputField("");

  const [password, handleChangePassword, resetPassword] = useInputField("");

  const [showPassword, handleShowPassword] = useShowPassword(false);

  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    login({ email, password });
    resetPassword();
    resetEmail();
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="containerTitle">
        <h1 className="h1Title"> تسجيل الدخول </h1>
        <AiOutlineLine className="lineIcon" />
      </div>
      <div className={styles.main}>
        <ValidatorForm onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div className={styles.containerLoginForms}>
              <div>
                <p className={styles.textInformation}>
                  الرجاء إدخال التفاصيل الخاصة بك أدناه لتسجيل الدخول إلى حسابك{" "}
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
                  <FiAlertCircle className={styles.alertIcon} />
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
                ليس لديك حساب بالفعل ؟؟
              </p>
              <Link href="/account/register">
                <button className={styles.signUpBtn}>سجل الآن</button>
              </Link>
              <p className={styles.textMoreFeatures}>
                سجل الآن لتحصل على ميزات إضافية, لمعرفة الميزات إضغط{" "}
                <span>{"هنا"}</span>
              </p>
            </div>
          </div>
        </ValidatorForm>
      </div>
    </>
  );
}
