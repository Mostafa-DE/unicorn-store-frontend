import styles from "@/styles/RegisterForm.module.css";
import Layout from "./Layout";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

/*-----------------------Hooks---------------------------*/
import useInputField from "@/Hooks/useInputField";
import useShowPassword from "@/Hooks/useShowPassword";
/*-------------------------X-----------------------------*/

/*--------------------React Icons------------------------*/
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { ImHeart } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { FiAlertCircle } from "react-icons/fi";
/*-------------------------X----------------------------*/

export default function RegisterForm() {
  /*-------------State for Input register--------------*/
  const [email, handleChangeEmail, resetEmail] = useInputField("");
  const [password, handleChangePassword, resetPassword] = useInputField("");
  const [confirmPassword, handleChangeConfirmPassword, resetConfirmPassword] =
    useInputField("");
  const [username, handleChangeUsername, resetUsername] = useInputField("");
  const [showPassword, handleShowPassword] = useShowPassword(false);
  /*------------------------X-----------------------*/

  const handleSubmit = () => {
    console.log("submit :)");
    resetEmail();
    resetPassword();
    resetUsername();
    resetConfirmPassword();
  };

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.container}>
          <ValidatorForm onSubmit={handleSubmit}>
            <div className={styles.contactDetails}>
              <TextValidator
                type="text"
                onChange={handleChangeUsername}
                value={username}
                fullWidth
                variant="standard"
                label="Username"
                validators={["required"]}
                errorMessages={["You can't leave this field empty !!"]}
              />
              <TextValidator
                type="email"
                onChange={handleChangeEmail}
                value={email}
                fullWidth
                variant="standard"
                label="Email Address"
                validators={["required"]}
                errorMessages={["You can't leave this field empty !!"]}
              />
              <div className={styles.containerPassword}>
                <TextValidator
                  type="password"
                  onChange={handleChangePassword}
                  value={password}
                  fullWidth
                  variant="standard"
                  label="Password"
                  validators={["required"]}
                  errorMessages={["You can't leave this field empty !!"]}
                />
                {showPassword === true ? (
                  <RiEyeLine
                    className={styles.iconPassword}
                    onClick={handleShowPassword}
                  />
                ) : (
                  <RiEyeCloseLine
                    className={styles.iconPassword}
                    onClick={handleShowPassword}
                  />
                )}
              </div>

              <TextValidator
                type="password"
                onChange={handleChangeConfirmPassword}
                value={confirmPassword}
                fullWidth
                variant="standard"
                label="Confirm Password"
                validators={["required"]}
                errorMessages={["You can't leave this field empty !!"]}
              />
            </div>
          </ValidatorForm>
        </div>
      </div>
    </Layout>
  );
}
