import React, { useContext } from 'react';
import { SharedContext } from '../contexts/SharedContext';
import theme from '../styles/globals.module.css';
import styles from '../styles/ChangePassword.module.css';

const ChangePassword = () => {
  const { isMobile, isDarkMode, showChangePasswordComponent, toggleChangePasswordVisibility } = useContext(SharedContext);

  // MOBILE VERSION
  if (isMobile) {
    return (
      <div>
        <div></div>
      </div>
    );
  }

  // DESKTOP VERSION
  return (
    <div id={isDarkMode ? theme.dark : theme.light} className={styles.container__changepassword}>
      <div className={styles.wrapper__changepassword_form}>
        <form className={styles.changepassword__form}>
          <h2 className={styles.changepassword__header}>Change Password</h2>
          <label className={styles.changepassword__label}>
            Enter New Password
          </label>
          <input className={styles.changepassword__input} type="password" />
          <label className={styles.changepassword__label}>
            Confirm New Password
          </label>
          <input className={styles.changepassword__input} type="password" />
          <button type="submit" className={styles.changepassword__button}>
            Update Password
          </button>
        </form>
        <span
          className={styles.changepassword__goback}
          onClick={() => {
            toggleChangePasswordVisibility(!showChangePasswordComponent);
          }}
        >
          Go Back to your Message Feed
        </span>
      </div>
    </div>
  );
};

export default ChangePassword;
