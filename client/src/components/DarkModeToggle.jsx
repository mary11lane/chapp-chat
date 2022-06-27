import React, { useContext } from 'react';
import { SharedContext } from '../contexts/SharedContext';
import theme from '../styles/globals.module.css';
import styles from '../styles/DarkModeToggle.module.css';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useContext(SharedContext);

  return (
    <label  id={isDarkMode ? theme.dark : theme.light} className={styles.switch}>
      <input
        type="checkbox"
        onChange={() => {
          toggleDarkMode(!isDarkMode);
          console.log(isDarkMode);
        }}
      />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default DarkModeToggle;
