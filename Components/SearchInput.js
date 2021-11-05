import styles from "@/styles/SearchInput.module.css";

export default function SearchInput({ searchTerm, handleChange }) {
  return (
    <div data-aos="fade-in" className={styles.containerSearchInput}>
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
