import styles from "@/components/PropertiesOurPage/PropertiesOurPage.module.css";
import { GiPayMoney } from "react-icons/gi";
import { GiReturnArrow } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";

export default function PropertiesOurPage() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div data-aos="fade-in" className={styles.containerPayWhenReceive}>
          <GiPayMoney className={styles.payMoneyIcon} />
          <h4> الدفع عند الإستلام </h4>
          <p>ادفع الفاتورة عند وصول الطلب والتحقق منه</p>
        </div>

        <div data-aos="fade-in" className={styles.containerFastDelivery}>
          <FaShippingFast className={styles.fastDeliveryIcon} />
          <h4> سرعة توصيل ممتازة </h4>
          <p>
            التوصيل خلال 24 ساعة داخل عمان. التوصيل في أقل من 48 ساعة خارج عمان
          </p>
        </div>

        <div data-aos="fade-in" className={styles.containerCheckBeforeReceive}>
          <GiReturnArrow className={styles.returnIcon} />
          <h4> المعاينة قبل الإستلام</h4>
          <p>
            تأكد من صحة طلبك قبل الإستلام مع إمكانية إرجاع الطلب في حال عدم
            التطابق
          </p>
        </div>
      </div>
    </div>
  );
}
