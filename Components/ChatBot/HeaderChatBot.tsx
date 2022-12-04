import React from "react";
import styles from "@/components/ChatBot/HeaderChatBot.module.css";
import {VscClose} from "react-icons/vsc";
import Image from 'next/legacy/image'

interface IHeaderChatBotProps {
    userAccount: any;
    toggleFloating: () => void;
}

const HeaderChatBot: React.FC<IHeaderChatBotProps> = ({toggleFloating, userAccount}) => {
    return (
        <div className={styles.main}>
            <VscClose className={styles.closeIcon} onClick={toggleFloating}/>
            <span className={styles.welcomeText}>
        {userAccount?.firstName} مرحباً بك
      </span>
            <Image src="/images/avatar.svg"
                   style={{
                       backgroundColor: "#fb9aa7",
                       padding: "0.3rem",
                       borderRadius: "50%",
                       margin: "0.5rem 0.5rem 0 0",
                   }}
                   alt="avatar image"
                   height={0}
                   width={40}
            />
        </div>
    );
};

export default HeaderChatBot;
