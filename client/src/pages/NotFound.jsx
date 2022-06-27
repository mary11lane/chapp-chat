import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/NotFound.module.css';

const NotFound = () => {
  return (
    <main className={styles.main__container}>
      <img
        className={styles.notfound__img}
        src="http://localhost:3000/src/assets/other-images/notfound-img.svg"
        alt="page does not exist"
      />
      <div className={styles.text}>
        Uh-oh! The page you're looking for doesn't exist.
      </div>
      <div className={styles.text}>
        Return to{' '}
        <Link className={styles.backlink} to="/">
          CHAPP
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
