import styles from "@/styles/HeaderChatBot.module.css";
import { VscClose } from "react-icons/vsc";

export default function Test({ toggleFloating, userAccount }) {
  return (
    <div className={styles.main}>
      <VscClose className={styles.closeIcon} onClick={toggleFloating} />
      <span className={styles.welcomeText}>
        {userAccount?.firstName} مرحباً بك
      </span>
      <img className={styles.imgAvatar} src="/images/avatar.svg" />
    </div>
  );
}
