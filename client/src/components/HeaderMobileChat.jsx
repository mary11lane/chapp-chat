import React, { useContext } from "react";
import { SharedContext } from "../contexts/SharedContext";
import PhoneCallIcon from "../assets/icons/call_black.svg";
import VideoCallIcon from "../assets/icons/video_call_black.svg";
import InfoIcon from "../assets/icons/info_black.svg";
import SearchIcon from "../assets/icons/search_black.svg";
import theme from "../styles/globals.module.css";
import styles from "../styles/HeaderMobileChat.module.css";
import GoBackIconTwo from "../assets/icons/west_black.svg";

const HeaderMobileChat = () => {
  const { isDarkMode, toggleChatFeedVisibility, toggleChatVisibility } =
    useContext(SharedContext);
  return (
    <div
      id={isDarkMode ? theme.dark : theme.light}
      className={styles.header__container}
    >
      <div className={styles.wrapper_goback_button}>
        <button
          className={styles.goback_button}
          onClick={() => {
            toggleChatVisibility(false);
            toggleChatFeedVisibility(true);
          }}
        >
          <img className={styles.button__image} src={GoBackIconTwo} />
        </button>
      </div>
      <div className={styles.wrapper_friendname}>
        <p className={styles.friendname_text}>{friendName}</p>
      </div>
      <div className={styles.wrapper_addtl_buttons}>
        <button className={styles.addtl_button}>
          <img className={styles.button__image} src={SearchIcon} />
        </button>
        <button className={styles.addtl_button}>
          <img className={styles.button__image} src={PhoneCallIcon} />
        </button>
        <button className={styles.addtl_button}>
          <img className={styles.button__image} src={VideoCallIcon} />
        </button>
        <button className={styles.addtl_button}>
          <img className={styles.button__image} src={InfoIcon} />
        </button>
      </div>
    </div>
  );
};

export default HeaderMobileChat;
