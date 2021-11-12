import styles from "@/styles/ForgotPasswordForm.module.css";
import Link from "next/link";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useInputField from "@/Hooks/useInputField";
import Swal from "sweetalert2";

export default function ForgotPasswordForm() {
  const [email, handleChangeEmail, resetEmail] = useInputField("");

  const handleSubmit = evnt => {
    evnt.preventDefault();

    Swal.fire({
      title: "لقد قمنا بإرسال رابط إعادة تعيين كلمة المرور",
      icon: "success",
      confirmButtonColor: "#fb9aa7",
      confirmButtonText: "حسناً",
      showClass: {
        popup: "animate__animated animate__fadeInDown"
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp"
      },
      footer: "<p>يرجى التحقق من البريد الإلكتروني الخاص بك</p>"
    });
    resetEmail("");
  };

  return (
    <div>
      <div className={styles.main}>
        <ValidatorForm onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div className={styles.boxContainer}>
              <h4>إعادة تعيين كلمة المرور</h4>
              <hr />
              <p> لا تقلق, يحدث مع المعظم منا </p>
              <TextValidator
                type="email"
                name="email"
                value={email}
                onChange={handleChangeEmail}
                fullWidth
                variant="standard"
                label="ادخل عنوان بريدك الإلكتروني"
                validators={["required"]}
                errorMessages={["!! لا تستطيع ترك هذا الحقل فارغاً"]}
              />
              <button type="submit" className={styles.btn}>
                ارسل لي رابط تعيين كلمة المرور
              </button>
              <div className={styles.contactText}>
                إذا كان لديك أي مشكلة في إعادة تعيين كلمة المرور لا تتردد في{" "}
                <br />
                <Link href="/contact">
                  <a className={styles.link}> التواصل معنا </a>
                </Link>
              </div>
            </div>
          </div>
        </ValidatorForm>
      </div>
    </div>
  );
}
