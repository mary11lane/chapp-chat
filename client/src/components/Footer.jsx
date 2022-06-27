import React, { useContext } from 'react';
import { SharedContext } from '../contexts/SharedContext';
import theme from '../styles/globals.module.css';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const { isDarkMode } = useContext(SharedContext);
  return (
    <main id={isDarkMode ? theme.dark : theme.light} className={styles.footer}>
      <span className={styles.logo}>CHAPP</span> &copy; 2022
    </main>
  );
};

export default Footer;
