import styles from "@/styles/SubscripeForm.module.css";
import Swal from "sweetalert2";
import useInputState from "@/Hooks/useInputField";

export default function Test() {
  const [value, handleChangeValue, resetValue] = useInputState("");

  const handleSubmit = evnt => {
    evnt.preventDefault();
    Swal.fire({
      title: "رائع, شكراً لانضمامك إلى عائلتنا",
      text: "سيتم إرسال لك العروض والمنتجات الجديدة والتحديثات ",
      icon: "success",
      confirmButtonColor: "#fb9aa7",
      confirmButtonText: "حسناً",
      footer:
        "<p> لا داعي للقلق لا يوجد هنالك أي بريد إعلاني أو غير مرغوب به</p>"
    });
    resetValue();
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.containerImgs}>
          <img
            data-aos="fade-right"
            src="/images/unicorn/womenPng.png"
            className={styles.womenImg}
            alt="women-subscribe-img"
          />
          <div data-aos="zoom-in" className={styles.containerForm}>
            <span>إشترك معنا الآن</span>
            <p>إشترك للحصول على آخر الأخبار و العروض الجديدة</p>
            <form onSubmit={handleSubmit}>
              <div className={styles.containerInput}>
                <input
                  value={value}
                  onChange={handleChangeValue}
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                />
                <button type="submit">إشترك الآن</button>
              </div>
            </form>
          </div>
          <img
            data-aos="fade-left"
            src="/images/unicorn/manPng.png"
            className={styles.manImg}
            alt="man-subscribe-img"
          />
        </div>
      </div>
    </div>
  );
}
