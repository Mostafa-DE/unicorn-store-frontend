import styles from "@/components/SearchInput/SearchInput.module.css";

export default function SearchInput({ searchTerm, handleChange }) {
  return (
    <div data-aos="fade-in" data-aos-once='true' className={styles.containerSearchInput}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className={styles.SearchInput}
        placeholder="...اكتب ما تبحث عنه هنا"
      />
    </div>
  );
}
