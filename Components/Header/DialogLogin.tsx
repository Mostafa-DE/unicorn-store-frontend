import styles from "@/components/Header/Header.module.css";
import React, {useContext, useEffect, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Alert from "react-bootstrap/Alert";
import DialogContent from "@material-ui/core/DialogContent";
import {RiEyeCloseLine, RiEyeLine} from "react-icons/ri";
import {FiAlertCircle} from "react-icons/fi";
import Link from "next/link";
import {useRouter} from "next/router";
import Slide from "@material-ui/core/Slide";
import {AuthContext} from "@/context/AuthContext";
import {languages} from "@/components/Header/TranslateText";
import useLoginDialog from "@/Hooks/useLoginDialog";
import useInputField from "@/Hooks/useInputField";
import useShowPassword from "@/Hooks/useShowPassword";
import {LanguageContext} from "@/context/LanguageContext";
import {CgSpinnerTwoAlt} from "react-icons/cg";
import {FaGoogle} from "react-icons/fa";
import {API_URL} from "@/config/index";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogLogin() {
    const router = useRouter();

    const [loginDialog, openLoginDialog, closeLoginDialog] = useLoginDialog();
    const [username, handleChangeUsername] = useInputField();
    const [password, handleChangePassword] = useInputField();
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
        error && setShowErrorMessage(true);
    }, [error, user]);

    const {titleLogin, titleLogout} = languages[language];

    const handleSubmit = async (evnt) => {
        evnt.preventDefault();
        setIsLoading(true);
        await login({username, password});
        setIsLoading(false);
        if(!error) closeLoginDialog();
    };
    const handleCloseErrorMessage = () => {
        setShowErrorMessage(!showErrorMessage);
        setError(null);
    };
    const handleShowAlertRemember = () => {
        setShowAlertRememberCookies(!showAlertRememberCookies);
    };

    // const handleLoginGoogle = async () => {
    //     await router.push(`${API_URL}/connect/google`);
    // };

    return (
        <div>
            {!user && (
                <li
                    //TODO: add right types here
                    // @ts-ignore
                    onClick={openLoginDialog}
                >
                    {titleLogin}
                </li>
            )}
            {user && <li onClick={logout}>{titleLogout}</li>}

            <Dialog
                //TODO: add right types here
                // @ts-ignore
                open={loginDialog}
                //TODO: add right types here
                // @ts-ignore
                TransitionComponent={Transition}
                keepMounted
                //TODO: add right types here
                // @ts-ignore
                onClose={closeLoginDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <ValidatorForm onSubmit={handleSubmit}>
                    <p className={styles.titleDialog}>تسجيل الدخول</p>

                    {/*<div className={styles.containerGoogleAndFacebookBtn}>*/}
                    {/*    <button*/}
                    {/*        type="button"*/}
                    {/*        className={styles.googleBtn}*/}
                    {/*        onClick={handleLoginGoogle}*/}
                    {/*    >*/}
                    {/*        <FaGoogle/>*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                    <Alert
                        style={{
                            maxWidth: "20rem",
                            textAlign: "center",
                            fontSize: "0.8rem",
                        }}
                        variant="danger"
                        dismissible
                        onClose={handleCloseErrorMessage}
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
                                //TODO: add right types here
                                // @ts-ignore
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
                                    //TODO: add right types here
                                    // @ts-ignore
                                    onChange={handleChangePassword}
                                    value={password}
                                    fullWidth
                                    variant="standard"
                                    label="الرقم السري"
                                    validators={["required"]}
                                    errorMessages={["!! لا تستطيع ترك هذا الحقل فارغاً"]}
                                />
                                {showPassword === true ? (
                                    <RiEyeLine
                                        className={styles.iconPassword}
                                        //TODO: add right types here
                                        // @ts-ignore
                                        onClick={handleShowPassword}
                                    />
                                ) : (
                                    <RiEyeCloseLine
                                        className={styles.iconPassword}
                                        //TODO: add right types here
                                        // @ts-ignore
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
