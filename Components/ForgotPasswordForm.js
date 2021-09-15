import styles from "@/styles/ForgotPasswordForm.module.css";
import Layout from "./Layout";
import Link from "next/link";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useInputField from "@/Hooks/useInputField";

export default function ForgotPasswordForm() {
  const [email, handleChangeEmail] = useInputField("");

  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    setEmail("");
  };

  return (
    <Layout>
      <div className={styles.main}>
        <ValidatorForm onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div className={styles.boxContainer}>
              <h4> Recover Password </h4>
              <hr />
              <p> Don't worry, happens to the most of us. </p>
              <TextValidator
                type="email"
                name="email"
                value={email}
                onChange={handleChangeEmail}
                fullWidth
                variant="standard"
                label="Email Address"
                validators={["required"]}
                errorMessages={["You Can't leave this field empty !!"]}
              />
              <button type="submit" className={styles.btn}>
                Email me a recovery link
              </button>
              <div className={styles.contactText}>
                If you have any problem with recover password <br />
                <Link href="/contact">
                  <a className={styles.link}> Contact Us </a>
                </Link>
              </div>
            </div>
          </div>
        </ValidatorForm>
      </div>
    </Layout>
  );
}
