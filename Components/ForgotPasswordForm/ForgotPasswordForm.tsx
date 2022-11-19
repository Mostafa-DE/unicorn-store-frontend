import { useContext } from "react";
import styles from "@/components/ForgotPasswordForm/ForgotPasswordForm.module.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useInputField from "@/Hooks/useInputField";
import Swal from "sweetalert2";
import { LanguageContext } from "@/context/LanguageContext";
import { languages } from "@/components/ForgotPasswordForm/TranslateText";

export default function ForgotPasswordForm() {
  // translate text
  //TODO: add right types here
  // @ts-ignore
  const { language } = useContext(LanguageContext);
  const {
    title,
    paragraph,
    labelInput,
    errorMessage,
    btn,
    problemWithResetPassword,
    titleAlert,
    confirmButtonTextAlert,
    footerAlert,
  } = languages[language];
  // xxxxxxxxxxxxxxxx

  const [email, handleChangeEmail, resetEmail] = useInputField();

  const handleSubmit = (evnt) => {
    evnt.preventDefault();

    Swal.fire({
      title: `${titleAlert}`,
      icon: "success",
      confirmButtonColor: "#fb9aa7",
      confirmButtonText: `${confirmButtonTextAlert}`,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      footer: `<p>${footerAlert}</p>`,
    });
    //TODO: add right types here
    // @ts-ignore
    resetEmail("");
  };

  return (
    <div>
      <div className={styles.main}>
        <ValidatorForm onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div className={styles.boxContainer}>
              <h4>{title}</h4>
              <hr />
              <p> {paragraph} </p>
              <TextValidator
                type="email"
                name="email"
                value={email}
                //TODO: add right types here
                // @ts-ignore
                onChange={handleChangeEmail}
                fullWidth
                variant="standard"
                label={labelInput}
                validators={["required"]}
                errorMessages={errorMessage}
              />
              <button type="submit" className={styles.btn}>
                {btn}
              </button>
              <p className={styles.contactText}>
                {problemWithResetPassword}
                <div></div>
              </p>
            </div>
          </div>
        </ValidatorForm>
      </div>
    </div>
  );
}
