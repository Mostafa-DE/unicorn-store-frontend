import styles from "@/styles/RegisterForm.module.css";
import "animate.css";
import { useContext, useEffect } from "react";
import Layout from "./Layout";
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
      Swal({
        title: error,
        icon: "error",
        confirmButtonColor: "#fb9aa7",
      });
  });
  /*---------------------X---------------------*/

  /*-------------State for Input register--------------*/
  const [email, handleChangeEmail, resetEmail] = useInputField("");
  const [password, handleChangePassword, resetPassword] = useInputField("");
  const [confirmPassword, handleChangeConfirmPassword, resetConfirmPassword] =
    useInputField("");
  const [username, handleChangeUsername, resetUsername] = useInputField("");
  const [phone, handleChangePhone, resetPhone] = useInputField("");
  const [firstName, handleChangeFirstName, resetFirstName] = useInputField("");
  const [lastName, handleChangeLastName, resetLastName] = useInputField("");
  const [deliveryPhone, handleChangeDeliveryPhone, resetDeliveryPhone] =
    useInputField("");
  const [address, handleChangeAddress, resetAddress] = useInputField("");
  const [city, handleChangeCity, resetCity] = useInputField("");
  const [building, handleChangeBuilding, resetBuilding] = useInputField("");

  /*------------------------X-----------------------*/
  const [showPassword, handleShowPassword] = useShowPassword(false);

  const handleSubmit = (evnt) => {
    evnt.preventDefault();

    /*----------------validation password--------------------*/
    if (password !== confirmPassword) {
      Swal.fire({
        title: "!! كلمات المرور غير متطابقة",
        icon: "error",
        confirmButtonColor: "#fb9aa7",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        footer: "<p>كلمة المرور و تأكيد كلمة المرور يجب أن تكون متطابقة</p>",
      });
      return;
    }

    if (password.length < 8) {
      Swal.fire({
        title: "كلمة المرور يجب أن تكون على الأقل مكونة من 8 خانات",
        icon: "error",
        confirmButtonColor: "#fb9aa7",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });

      return;
    }

    if (password.search(/[0-9]/) === -1) {
      Swal.fire({
        title: "كلمة المرور يجب ان تحتوي على الأقل رقم واحد",
        icon: "error",
        confirmButtonColor: "#fb9aa7",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      return;
    }
    /*----------------------------x--------------------------*/

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
      building,
    });

    resetEmail();
    resetPassword();
    resetUsername();
    resetConfirmPassword();
    resetPhone();
    resetFirstName();
    resetLastName();
    resetDeliveryPhone();
    resetAddress();
    resetCity();
    resetBuilding();
  };

  return (
    <Layout>
      <section className={styles.main}>
        <ValidatorForm onSubmit={handleSubmit}>
          <div className={`container-fluid ${styles.hCustom}`}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              {/*---------------image login-----------------*/}
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <div className={"d-flex align-items-center my-4"}>
                  <p
                    className={`text-center fw-bold mx-3 mb-0 ${styles.titleContactDetails}`}
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
                    validators={["required"]}
                    errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
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
                      validators={["required"]}
                      errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
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
                </div>
                <div className="form-outline mb-3">
                  <TextValidator
                    type="text"
                    onChange={handleChangePhone}
                    value={phone}
                    fullWidth
                    variant="standard"
                    label="رقم الهاتف"
                    validators={["required"]}
                    errorMessages={["!! لا يمكنك ترك هذا الحقل فارغاً"]}
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
                    className={`text-center fw-bold mx-3 mb-0 ${styles.titleContactDetails}`}
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
                      type="text"
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
                      type="text"
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
    </Layout>
  );
}
