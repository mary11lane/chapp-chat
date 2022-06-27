import React, { useContext } from 'react';
import { SharedContext } from '../contexts/SharedContext';
import menuIcon from '../assets/icons/menu_black.svg';
import addFriendIcon from '../assets/icons/person_add_black.svg';
import searchIcon from '../assets/icons/search_black.svg';
import theme from '../styles/globals.module.css';
import styles from '../styles/HeaderMobileChatFeed.module.css';

const HeaderMobileChatFeed = () => {
  const {
    isDarkMode,
    toggleSettingsVisibility,
    toggleChatFeedVisibility,
    showAddFriendComponent,
    toggleAddFriendVisibility,
  } = useContext(SharedContext);

  return (
    <div  id={isDarkMode ? theme.dark : theme.light} className={styles.header__wrapper}>
      <div className={styles.header__button_wrapper_left}>
        <button
          className={styles.header__button}
          onClick={() => {
            toggleSettingsVisibility(true);
            toggleChatFeedVisibility(false);
          }}
        >
          <img className={styles.header__button_icon} src={menuIcon} />
        </button>
      </div>
      <div className={styles.header__text_wrapper}>
        <p>All Messages</p>
      </div>
      <div className={styles.header__button_wrapper_right}>
        <button className={styles.header__button}>
          <img className={styles.header__button_icon} src={searchIcon} />
        </button>
        <button
          className={styles.header__button}
          onClick={() => {
            toggleAddFriendVisibility(!showAddFriendComponent);
            toggleChatFeedVisibility(false);
          }}
        >
          <img className={styles.header__button_icon} src={addFriendIcon} />
        </button>
      </div>
    </div>
  );
};

export default HeaderMobileChatFeed;
