import styles from "@/components/Header/Header.module.css";
import React, {useContext, useEffect, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Alert from "react-bootstrap/Alert";
import DialogContent from "@material-ui/core/DialogContent";
import {RiEyeCloseLine, RiEyeLine} from "react-icons/ri";
import {FiAlertCircle} from "react-icons/fi";
import Link from "next/link";
import Slide from "@material-ui/core/Slide";
import {AuthContext} from "@/context/AuthContext";
import {languages} from "@/components/Header/TranslateText";
import useLoginDialog from "@/Hooks/useLoginDialog";
import useInputField from "@/Hooks/useInputField";
import useShowPassword from "@/Hooks/useShowPassword";
import {LanguageContext} from "@/context/LanguageContext";
import {CgSpinnerTwoAlt} from "react-icons/cg";
import {TransitionProps} from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogLogin() {
    const [loginDialog, openLoginDialog, closeLoginDialog] = useLoginDialog();
    const [username, handleChangeUsername, resetUsername] = useInputField();
    const [password, handleChangePassword, resetPassword] = useInputField();
    const [showPassword, handleShowPassword] = useShowPassword();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showAlertRememberCookies, setShowAlertRememberCookies] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //TODO: add right types here
    // @ts-ignore
    const {login, logout, user, error, setError} = useContext(AuthContext);
    //TODO: add right types here
    // @ts-ignore
    const {language} = useContext(LanguageContext);

    useEffect(() => {
        if (error) setShowErrorMessage(true);
        if (user) {
            setError(null);
            resetPassword();
            resetUsername();
            setShowErrorMessage(false);
            closeLoginDialog();
        }
    }, [error, user]);

    const {titleLogin, titleLogout} = languages[language];

    const handleSubmit = async (evnt) => {
        evnt.preventDefault();
        setIsLoading(true);
        await login({username, password});
        setIsLoading(false);
    };

    const handleShowAlertRemember = () => {
        setShowAlertRememberCookies(!showAlertRememberCookies);
    };

    return (
        <div>
            {!user && (
                <li onClick={openLoginDialog}>
                    {titleLogin}
                </li>
            )}
            {user && <li onClick={logout}>{titleLogout}</li>}

            <Dialog open={loginDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={closeLoginDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
            >
                <ValidatorForm onSubmit={handleSubmit}>
                    <p className={styles.titleDialog}>تسجيل الدخول</p>
                    <Alert
                        style={{
                            maxWidth: "20rem",
                            textAlign: "center",
                            fontSize: "0.8rem",
                        }}
                        variant="danger"
                        show={showErrorMessage}
                    >
                        {error}
                    </Alert>

                    <Alert
                        style={{
                            maxWidth: "20rem",
                            textAlign: "center",
                            fontSize: "0.8rem",
                            color: "#333",
                        }}
                        variant="secondary"
                        dismissible
                        onClose={handleShowAlertRemember}
                        show={showAlertRememberCookies}
                    >
                        يرجى ملاحظة أننا نستخدم ملفات تعريف الارتباط للاحتفاظ بتسجيل الدخول
                        الخاص بك لمدة أسبوع ، وبعد ذلك يتم تسجيل الخروج تلقائيًا ، إذا كنت
                        لا تريد الاحتفاظ بتسجيل الدخول فيمكنك الضغط على خيار تسجيل الخروج من
                        القائمة
                    </Alert>

                    <DialogContent>
                        <div className={styles.containerInput}>
                            <TextValidator
                                type="text"
                                name="username"
                                onChange={handleChangeUsername}
                                value={username}
                                fullWidth
                                variant="standard"
                                label="اسم المستخدم"
                                validators={["required"]}
                                errorMessages={[" !! لا تستطيع ترك هذا الحقل فارغاً"]}
                            />
                            <div className={styles.containerPassword}>
                                <TextValidator
                                    type={showPassword === true ? "text" : "password"}
                                    onChange={handleChangePassword}
                                    value={password}
                                    fullWidth
                                    variant="standard"
                                    label="الرقم السري"
                                    validators={["required"]}
                                    errorMessages={["!! لا تستطيع ترك هذا الحقل فارغاً"]}
                                    name="password"
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
                            <div className={`form-check mb-0 ${styles.checkBox} `}>
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    id="form2Example3"
                                    checked
                                    readOnly
                                />
                                <label className="form-check-label" htmlFor="form2Example3">
                                    تذكرني
                                    <FiAlertCircle
                                        onClick={handleShowAlertRemember}
                                        className={styles.alertIcon}
                                    />
                                </label>
                            </div>
                            {isLoading === true ? (
                                <div className={styles.containerSpinner}>
                                    <CgSpinnerTwoAlt className={styles.rotating}/>
                                </div>
                            ) : (
                                <button type="submit" className={styles.signInBtn}>
                                    تسجيل الدخول
                                </button>
                            )}
                            <Link href="/account/forgot-password"
                                  className={styles.forgotPassword}
                            >
                                هل نسيت كلمة المرور الخاصة بك ؟؟
                            </Link>
                            <p className={styles.noAccountText}>
                                لا يوجد لديك حساب من قبل ؟؟
                            </p>
                            <Link href="/account/register" legacyBehavior>
                                <button type="submit" className={styles.registerBtn}>
                                    اشترك الآن
                                </button>
                            </Link>
                        </div>
                    </DialogContent>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}
