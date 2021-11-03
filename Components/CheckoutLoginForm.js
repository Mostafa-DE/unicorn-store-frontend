import styles from "@/styles/CheckoutLoginForm.module.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useContext, useEffect } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import useInputField from "@/Hooks/useInputField";
import useShowPassword from "@/Hooks/useShowPassword";
import { useRouter } from "next/router";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { FiAlertCircle } from "react-icons/fi";
import { GrFormNext } from "react-icons/gr";
import Swal from "sweetalert2";

export default function LoginForm() {
  const router = useRouter();

  // Auth context
  const { login, error } = useContext(AuthContext);
  useEffect(() => {
    error &&
      new Swal({
        title: error,
        icon: "error",
        confirmButtonColor: "#fb9aa7",
      });
  }, [login, error]);
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
      <nav className={styles.mainPageNav}>
        <ul className={styles.containerPageNav}>
          <li>
            <Link href="/products/shopping-bag">
              <a className={styles.LinkPage}>حقيبة التسوق</a>
            </Link>
          </li>
          <GrFormNext className={styles.nextIcon} />
          <li> تسجيل الدخول</li>
          <GrFormNext className={styles.nextIcon} />
          <li className={styles.otherLink}>معلومات التوصيل</li>
          <GrFormNext className={styles.nextIcon} />
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
                لا تريد إنشاء حساب ؟؟
              </p>
              <Link href="/payment/shipping-info">
                <button className={styles.signUpBtn}>أكمل الطلب كضيف </button>
              </Link>
              <span className={styles.orText}>أو</span>
              <Link href="/account/register">
                <button className={styles.signUpBtn}> انشاء حساب جديد </button>
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
