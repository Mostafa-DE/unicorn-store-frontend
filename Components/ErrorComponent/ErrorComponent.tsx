import styles from "@/components/ErrorComponent/ErrorComponent.module.css";
import Link from "next/link";

export interface IErrorComponentProps {
  reaction: string;
  statusError: string;
  ErrorMessage: string;
  buttonTxt?: string;
  buttonUrl?: string;
  hideBackButton?: boolean;
}

const ErrorComponent: React.FC<IErrorComponentProps> = ({
  reaction,
  statusError,
  ErrorMessage,
  buttonTxt = "",
  buttonUrl = "",
  hideBackButton,
}) => {
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
        {!hideBackButton && (
          <Link href={`/${buttonUrl}`} passHref={true}>
            <button className={styles.backBtn}>{buttonTxt}</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorComponent;
