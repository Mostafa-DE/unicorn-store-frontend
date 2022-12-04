import styles from "@/components/RegisterForm/RegisterForm.module.css";
import "../../node_modules/animate.css/animate.css";
import { useContext, useEffect, useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import useShowPassword from "@/Hooks/useShowPassword";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { alertLoginFailed } from "@/components/CheckoutLogin/Alerts";

export default function RegisterForm() {
  //TODO: add right types here
  // @ts-ignore
  const { register, error } = useContext(AuthContext);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const { username, email, password, confirmPassword } = values;

  const [showPassword, handleShowPassword] = useShowPassword();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (evnt) => {
    evnt.preventDefault();
    setIsLoading(true);
    await register({
      username,
      email,
      password,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    error && alertLoginFailed(error);
  }, [error]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPhoneNumber", (value) => {
      return value.length === 10 || value === "";
    });
    ValidatorForm.addValidationRule("isLocalNumber", (value) => {
      return !!(
        value.match("078") ||
        value.match("079") ||
        value.match("077") ||
        value === ""
      );
    });
    ValidatorForm.addValidationRule("validUsername", (value) => {
      let count = 0;
      let isContainLetters = false;
      const letters = [...value];
      letters.map((letter) => (parseInt(letter) ? count++ : null));
      letters.map((letter) =>
        !parseInt(letter) ? (isContainLetters = true) : null
      );
      if ((count >= 3 && isContainLetters) || value === "") return true;
    });
    ValidatorForm.addValidationRule("moreThan8Character", (value) => {
      return value.length >= 8 || value === "";
    });
    ValidatorForm.addValidationRule("passwordContainANumbers", (value) => {
      return value.search(/[0-9]/) !== -1 || value === "";
    });
    ValidatorForm.addValidationRule("matchPasswords", (value) => {
      return value === password || value === "";
    });
  }, [values]);

  return (
    <>
      <section className={styles.main}>
        <ValidatorForm onSubmit={handleSubmit}>
          <div className="container-fluid">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <div className="d-flex justify-content-center align-items-center my-4">
                  <p
                    className={`text-center  mx-3 mb-0 ${styles.titleContactDetails}`}
                  >
                    إنشاء حساب جديد
                  </p>
                </div>
                <div className="form-outline mb-3">
                  <TextValidator
                    type="username"
                    name="username"
                    onChange={handleChange}
                    value={username}
                    fullWidth
                    variant="standard"
                    label="إسم المستخدم"
                    validators={["required", "validUsername"]}
                    errorMessages={[
                      "!! لا يمكنك ترك هذا الحقل فارغاً",
                      " إسم المستخدم يجب أن يحتوي على حرف واحد و 3 أرقام على الأقل ",
                    ]}
                  />
                </div>
                <div className="form-outline mb-3">
                  <TextValidator
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    fullWidth
                    variant="standard"
                    label="البريد الإلكتروني"
                    validators={["required"]}
                    errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                  />
                </div>
                <div className="col d-flex justify-content-evenly">
                  <div className="mb-4">
                    <TextValidator
                      type={showPassword === true ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handleChange}
                      variant="standard"
                      label="الرقم السري"
                      validators={[
                        "required",
                        "moreThan8Character",
                        "passwordContainANumbers",
                      ]}
                      errorMessages={[
                        "!! لا يمكنك ترك هذا الحقل فارغاً",
                        "لا يمكن أن يكون الرقم السري أقل من 8 خانات",
                        "الرقم السري يجب ان يحتوي على الأقل رقم واحد",
                      ]}
                    />
                  </div>
                  <div className="mb-4 mx-3 d-flex">
                    <TextValidator
                      type={showPassword === true ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                      variant="standard"
                      label="تأكيد الرقم السري"
                      validators={["required", "matchPasswords"]}
                      errorMessages={[
                        "!! لا يمكنك ترك هذا الحقل فارغاً",
                        "كلمة المرور غير متطابقة",
                      ]}
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
                </div>

                <div className="d-flex justify-content-center align-items-center">
                  <div className="form-check d-flex justify-content-center mb-3">
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        required
                      />
                    </div>
                    <label className="form-check-label" htmlFor="form2Example3">
                      أنا اوافق على{" "}
                      <Link href="/terms-policy/terms-conditions" className={styles.linkTermsAndConditions}>
                          شروط و أحكام{" "}
                      </Link>
                      هذا الموقع
                    </label>
                  </div>
                </div>
                <div
                  className={`text-center text-lg-start ${styles.containerSignInBtn} `}
                >
                  {isLoading === true ? (
                    <div className={styles.containerSpinner}>
                      <CgSpinnerTwoAlt className={styles.rotating} />
                    </div>
                  ) : (
                    <div>
                      <button type="submit" className={styles.loginBtn}>
                        تسجيل
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ValidatorForm>
      </section>
    </>
  );
}
