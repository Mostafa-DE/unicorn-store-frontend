import React from "react";
import styles from "@/components/ChatBot/HeaderChatBot.module.css";
import { VscClose } from "react-icons/vsc";

interface IHeaderChatBotProps {
  userAccount: any;
  toggleFloating: () => void;
}

const HeaderChatBot: React.FC<IHeaderChatBotProps> = ({
  toggleFloating,
  userAccount,
}) => {
  return (
    <div className={styles.main}>
      <VscClose className={styles.closeIcon} onClick={toggleFloating} />
      <span className={styles.welcomeText}>
        {userAccount?.firstName} مرحباً بك
      </span>
      <img className={styles.imgAvatar} src="/images/avatar.svg"  alt="avatar image"/>
    </div>
  );
};

export default HeaderChatBot;
