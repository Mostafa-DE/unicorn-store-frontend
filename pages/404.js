import styles from "@/styles/404.module.css";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.oops}>OOPS!</h1>
          <p className={styles.pageNotFound}>404 - Page not found</p>
          <p className={styles.explainText}>
            ربما تمت إزالة الصفحة التي تبحث عنها أو أنها غير متاحة مؤقتًا
          </p>
          <Link href="/">
            <button className={styles.backBtn}>رجوع إلى الصفحة الرئيسية</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
