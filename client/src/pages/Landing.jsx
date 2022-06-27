import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoMdVideocam } from 'react-icons/io';
import { MdPresentToAll } from 'react-icons/md';
import { Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

import styles from '../styles/Landing.module.css';
import Footer from '../components/Footer';

const Landing = () => {
  const { user } = useContext(AuthContext);

  return user ? (
    <Navigate to="/conversations" />
  ) : (
    <main className={styles.main__container}>
      <section className={styles.section__image}>
        <img
          className={styles.image}
          src="src/assets/other-images/landing-img.svg"
          alt=".landing-image"
        />
      </section>
      <section className={styles.section__logo}>
        <div className={styles.section__logo__container}>
          <div className={styles.logo}>CHAPP</div>
          <section className={styles.icons}>
            <FaPhoneAlt className={styles.call} />
            <IoMdVideocam className={styles.show} />
            <MdPresentToAll className={styles.present} />
          </section>
          <div className={styles.landing__buttons}>
            <span>
              <Link className={styles.landing__button} to="/login">
                Login
              </Link>
            </span>
            <span className={styles.landing__button}>|</span>
            <span>
              <Link className={styles.landing__button} to="/registration">
                Signup
              </Link>
            </span>
          </div>
        </div>
        <Footer />
      </section>
    </main>
  );
};

export default Landing;
