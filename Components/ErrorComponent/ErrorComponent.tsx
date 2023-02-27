import styles from "@/components/ErrorComponent/ErrorComponent.module.css";
import Link from "next/link";
import {MouseEventHandler} from "react";
import {useRouter} from "next/router";

export interface IErrorComponentProps {
    reaction: string;
    statusError: string;
    ErrorMessage: string;
    buttonTxt?: string;
    buttonUrl?: string;
    showBackButton?: boolean;
    showPreviousPageButton?: boolean;
}

const ErrorComponent: React.FC<IErrorComponentProps> =
    ({
         reaction,
         statusError,
         ErrorMessage,
         buttonTxt = "",
         buttonUrl = "",
         showBackButton = false,
         showPreviousPageButton = false,
     }) => {
        const router = useRouter();
        return (
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1 data-aos="fade-in" className={styles.oops}>
                        {reaction}
                    </h1>
                    <p data-aos="fade-in" className={styles.pageNotFound}>
                        {statusError}
                    </p>
                    <p data-aos="fade-in" className={styles.explainText}>
                        {ErrorMessage}
                    </p>
                    {showBackButton && (
                        <Link href={`/${buttonUrl}`} passHref={true}>
                            <button className={styles.backBtn}>{buttonTxt}</button>
                        </Link>
                    )}
                    {showPreviousPageButton && (
                        <button onClick={() => router.back()} className={styles.backBtn}>{buttonTxt}</button>
                    )}

                </div>
            </div>
        );
    };

export default ErrorComponent;
