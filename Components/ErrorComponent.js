import styles from "@/styles/ErrorComponent.module.css";
import Link from "next/link";

export default function ErrorComponent({
  reaction,
  statusError,
  ErrorMessage,
  buttonTxt,
  buttonUrl
}) {
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
        <Link href={`/${buttonUrl}`} passHref={true}>
          <button className={styles.backBtn}>{buttonTxt}</button>
        </Link>
      </div>
    </div>
  );
}
