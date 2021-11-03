import styles from "@/styles/Test.module.css";

export default function Test() {
  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    console.log("Submit :)");
  };

  return (
    <div className={styles.main}>
      <h1>Test Page...</h1>
    </div>
  );
}
