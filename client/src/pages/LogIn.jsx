import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { AuthContext } from '../contexts/auth';
import Footer from '../components/Footer';
import { SharedContext } from '../contexts/SharedContext';
import theme from '../styles/globals.module.css';
import styles from '../styles/Login.module.css';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const { isDarkMode } = useContext(SharedContext);
  const [data, setData] = useState({
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // const result = await signInWithRedirect(auth, provider);
      await updateDoc(doc(db, 'users', result.user.uid), {
        isOnline: true,
      });
      setData({
        email: '',
        password: '',
        error: null,
        loading: false,
      });
      navigate('/conversations');
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      return setData({ ...data, error: 'All fields are required' });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, 'users', result.user.uid), {
        isOnline: true,
      });
      navigate('/conversations');
    } catch (err) {
      switch (err.message) {
        case 'Firebase: Error (auth/wrong-password).':
          setData({
            ...data,
            error: 'Email/password is incorrect',
            loading: false,
          });
          break;
        default:
          setData({
            ...data,
            error: 'An error occured. Try again',
            loading: false,
          });
      }
    }
  };
  return user ? (
    <Navigate to="/conversations" />
  ) : (
    <div id={isDarkMode ? theme.dark : theme.light} className={styles.section}>
      <div className={styles.section__container}>
        <h1 className={styles.container__heading}>Login</h1>
        <p className={styles.container__subheading}>
          Please sign in to continue.
        </p>
        <form className={styles.container__form} onSubmit={handleSubmit}>
          <input
            className={styles.form__input__email}
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <input
            className={styles.form__input__password}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />

          <br></br>
          <button className={styles.form__button} type="submit">
            Login
          </button>
          <div className={styles.error__message}>{error}</div>
          <p className={styles.container__text}>or</p>
          <GoogleButton style={{ width: 301 }} onClick={handleGoogleSignIn} />
        </form>
        <p className={styles.container__text}>
          Don't have an account yet?{' '}
          <Link className={styles.container__backlink} to="/registration">
            Sign up.
          </Link>
        </p>
        <p className={styles.container__text}>
          <Link className={styles.container__backlink} to="/password-recovery">
            Forgot password?
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default LogIn;
