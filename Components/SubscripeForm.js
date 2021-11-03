import styles from "@/styles/SubscripeForm.module.css";

export default function Test() {
  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    console.log("Submit :)");
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.containerImgs}>
          <img
            data-aos="fade-right"
            src="/images/unicorn/womenPng.png"
            className={styles.womenImg}
          />
          <div data-aos="zoom-in" className={styles.containerForm}>
            <span>إشترك معنا الآن</span>
            <p>إشترك للحصول على آخر الأخبار و العروض الجديدة</p>
            <form onSubmit={handleSubmit}>
              <div className={styles.containerInput}>
                <input
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
          />
        </div>
      </div>
    </div>
  );
}
