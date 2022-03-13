import styles from "@/components/RegisterForm/RegisterForm.module.css";
import "../../node_modules/animate.css/animate.css";
import { useContext, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Link from "next/link";
import Swal from "sweetalert2";

/*----------------------Context--------------------------*/
import { AuthContext } from "@/context/AuthContext";
/*-------------------------X-----------------------------*/

/*-----------------------Hooks---------------------------*/
import useInputField from "@/Hooks/useInputField";
import useShowPassword from "@/Hooks/useShowPassword";
/*-------------------------X-----------------------------*/

/*--------------------React Icons------------------------*/
import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
/*-------------------------X----------------------------*/

export default function RegisterForm() {
  /*-----------context authenication-----------*/
  const { register, error } = useContext(AuthContext);
  useEffect(() => {
    error &&
      new Swal({
        title: "حدث خطأ أثناء عملية إنشاء الحساب",
        text: error,
        icon: "error",
        confirmButtonColor: "#fb9aa7",
        confirmButtonText: "حسناً"
      });
  }, [register, error]);

  /*---------------------X---------------------*/

  /*-------------State for Input register--------------*/
  const [email, handleChangeEmail] = useInputField("");
  const [password, handleChangePassword] = useInputField("");
  const [confirmPassword, handleChangeConfirmPassword] = useInputField("");
  const [username, handleChangeUsername] = useInputField("");
  const [phone, handleChangePhone] = useInputField("");
  const [firstName, handleChangeFirstName] = useInputField("");
  const [lastName, handleChangeLastName] = useInputField("");
  const [deliveryPhone, handleChangeDeliveryPhone] = useInputField("");
  const [address, handleChangeAddress] = useInputField("");
  const [city, handleChangeCity] = useInputField("");
  const [building, handleChangeBuilding] = useInputField("");

  /*------------------------X-----------------------*/
  const [showPassword, handleShowPassword] = useShowPassword(false);

  const handleSubmit = evnt => {
    evnt.preventDefault();

    register({
      username,
      email,
      password,
      phone,
      firstName,
      lastName,
      address,
      deliveryPhone,
      city,
      building
    });
  };

  // Validations Rule for input
  useEffect(() => {
    ValidatorForm.addValidationRule("isPhoneNumber", value => {
      if (value.length > 10 || value.length < 10) {
        return false;
      }
      return true;
    });
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("isLocalNumber", value => {
      if (value.match("078") || value.match("079") || value.match("077")) {
        return true;
      }
      return false;
    });
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("validUsername", value => {
      if (value.search(/[0-9]/) === -1) {
        return false;
      }
      return true;
    });
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("validUsername", value => {
      if (value.search(/[0-9]/) === -1) {
        return false;
      }
      return true;
    });
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("moreThan8Character", value => {
      if (value.length > 8) {
        return true;
      }
      return false;
    });
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("passwordContainANumbers", value => {
      if (value.search(/[0-9]/) === -1) {
        return false;
      }
      return true;
    });
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("matchPasswords", value => {
      if (value === password) {
        return true;
      }
      return false;
    });
  });

  // xxxxxxxxxxxxxxxxxxxxxxxxx

  return (
    <div>
      <section className={styles.main}>
        <ValidatorForm onSubmit={handleSubmit}>
          <div className={`container-fluid ${styles.hCustom}`}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              {/*---------------image login-----------------*/}
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <div className={"d-flex align-items-center my-4"}>
                  <p
                    className={`text-center  mx-3 mb-0 ${styles.titleContactDetails}`}
                  >
                    بيانات المستخدم
                  </p>
                </div>

                {/*-------------------all inputs-------------------*/}
                <div className="form-outline mb-3">
                  <TextValidator
                    type="username"
                    onChange={handleChangeUsername}
                    value={username}
                    fullWidth
                    variant="standard"
                    label="إسم المستخدم"
                    validators={["required", "validUsername"]}
                    errorMessages={[
                      "!! لا يمكنك ترك هذا الحقل فارغاً",
                      " إسم المستخدم يجب أن يحتوي على الأقل 3 أرقام  "
                    ]}
                  />
                </div>
                <div className="form-outline mb-3">
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
                </div>

                <div className="col d-flex justify-content-evenly">
                  <div className="mb-4">
                    <TextValidator
                      type={showPassword === true ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handleChangePassword}
                      variant="standard"
                      label="الرقم السري"
                      validators={[
                        "required",
                        "moreThan8Character",
                        "passwordContainANumbers"
                      ]}
                      errorMessages={[
                        "!! لا يمكنك ترك هذا الحقل فارغاً",
                        "لا يمكن أن يكون الرقم السري أقل من 8 خانات",
                        "الرقم السري يجب ان يحتوي على الأقل رقم واحد"
                      ]}
                    />
                  </div>

                  <div className="mb-4 mx-3 d-flex">
                    <TextValidator
                      type={showPassword === true ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChangeConfirmPassword}
                      variant="standard"
                      label="تأكيد الرقم السري"
                      validators={["required", "matchPasswords"]}
                      errorMessages={[
                        "!! لا يمكنك ترك هذا الحقل فارغاً",
                        "كلمة المرور غير متطابقة"
                      ]}
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
                </div>
                <div className="form-outline mb-3">
                  <TextValidator
                    type="number"
                    onChange={handleChangePhone}
                    value={phone}
                    fullWidth
                    variant="standard"
                    label="رقم الهاتف"
                    validators={["required", "isPhoneNumber", "isLocalNumber"]}
                    errorMessages={[
                      "!! لا يمكنك ترك هذا الحقل فارغاً",
                      "!! رقم الهاتف يجب أن يتكون من 10 أرقام فقط",
                      "(078 , 079, 077) رقم الهاتف يجب أن يبدأ ب"
                    ]}
                  />
                </div>
                {/*-----------------------X------------------------*/}
              </div>
              {/*--------------------X----------------------*/}

              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <div
                  className={`${styles.divider} d-flex align-items-center my-4`}
                >
                  <p
                    className={`text-center  mx-3 mb-0 ${styles.titleContactDetails}`}
                  >
                    بيانات التوصيل
                  </p>
                </div>

                {/*-------------------all inputs-------------------*/}
                <div className="col d-flex justify-content-evenly">
                  <div className="mb-4">
                    <TextValidator
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={handleChangeFirstName}
                      variant="standard"
                      label="الإسم الأول"
                      validators={["required"]}
                      errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                    />
                  </div>

                  <div className="mb-4 mx-3 d-flex">
                    <TextValidator
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={handleChangeLastName}
                      variant="standard"
                      label="الإسم الأخير"
                      validators={["required"]}
                      errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                    />
                  </div>
                </div>

                <div className="col d-flex justify-content-evenly">
                  <div className="mb-4">
                    <TextValidator
                      type="text"
                      name="city"
                      value={city}
                      onChange={handleChangeCity}
                      variant="standard"
                      label="المحافظة"
                      validators={["required"]}
                      errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                    />
                  </div>

                  <div className="mb-4 mx-3 d-flex">
                    <TextValidator
                      type="number"
                      name="lastName"
                      value={building}
                      onChange={handleChangeBuilding}
                      variant="standard"
                      label="رقم العمارة"
                      validators={["required"]}
                      errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-outline flex-fill mb-4">
                    <TextValidator
                      type="text"
                      value={address}
                      onChange={handleChangeAddress}
                      fullWidth
                      variant="standard"
                      label="العنوان كامل"
                      validators={["required"]}
                      errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
                    />
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-outline flex-fill mb-4">
                    <TextValidator
                      type="number"
                      value={deliveryPhone}
                      onChange={handleChangeDeliveryPhone}
                      fullWidth
                      variant="standard"
                      label="رقم هاتف للتوصيل (اختياري)"
                    />
                  </div>
                </div>

                {/*-----------------------X------------------------*/}

                <div className="d-flex justify-content-between align-items-center">
                  {/*--------checkBox accept terms&conditions--------*/}
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
                      <Link href="/terms-policy/terms-conditions">
                        <a className={styles.linkTermsAndConditions}>
                          شروط و أحكام{" "}
                        </a>
                      </Link>
                      هذا الموقع
                    </label>
                  </div>
                  {/*------------------------X-----------------------*/}
                </div>

                <div
                  className={`text-center text-lg-start ${styles.containerSignInBtn} `}
                >
                  {/*----------------------button login-------------------------*/}
                  <button type="submit" className={styles.loginBtn}>
                    تسجيل
                  </button>
                  {/*----------------------------X------------------------------*/}
                </div>
              </div>
            </div>
          </div>
        </ValidatorForm>
      </section>
    </div>
  );
}
