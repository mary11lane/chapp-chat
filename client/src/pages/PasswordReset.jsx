import React, { useContext } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase';
import { AuthContext } from '../contexts/auth';
import { SharedContext } from '../contexts/SharedContext';
import theme from '../styles/globals.module.css';
import styles from '../styles/Password.module.css';
import Footer from '../components/Footer';
import { useState } from 'react';

const PasswordReset = () => {
  const { isDarkMode } = useContext(SharedContext);
  const resetPassword = (oobCode, newPassword) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
  };

  const useQuery = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
  };

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const query = useQuery();
  // console.log(query.get('mode'));
  // console.log(query.get('oobCode'));
  // console.log(query.get('continueUrl'));

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  // const handleChange = async (e) => {
  //   e.preventDefault();

  //   await resetPassword(query.get('oobCode'), newPassword)
  //     .then(
  //       toast('Password Has been changed', {
  //         theme: 'dark',
  //         autoClose: 3000,
  //       })
  //     )
  //     .catch((err) => console.log(err.message));
  //   setTimeout(() => {
  //     navigate('/login');
  //   }, 3000);
  // };

  const handleChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      await resetPassword(query.get('oobCode'), newPassword);
      setError(null);
      toast.success('Password has been changed', {
        autoClose: 2000,
        pauseOnHover: false,
        closeOnClick: true,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: 'top-center',
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      switch (err.message) {
        case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
          setError('Password must be atleast 6 characters');
          break;
        default:
          setError('An error occured');
      }
    }
  };

  return user ? (
    <Navigate to="/conversations" />
  ) : (
    <main
      id={isDarkMode ? theme.dark : theme.light}
      className={styles.main__container}
    >
      <section className={styles.main__section}>
        <div className={styles.heading}>Reset Password</div>
        <form className={styles.form__password} onSubmit={handleChange}>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`${styles.form__input} ${styles.password}`}
            id="password"
            placeholder="Password"
            type="password"
          ></input>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`${styles.form__input} ${styles.password}`}
            id="confirmpassword"
            placeholder="Confirm password"
            type="password"
          ></input>
          <button className={styles.form__button}>SUBMIT</button>
          <ToastContainer />
          <div className={styles.error__message}>{error}</div>
        </form>

        <Link className={styles.backlink} to="/login">
          Go back to Login page
        </Link>
      </section>
      <Footer />
    </main>
  );
};

export default PasswordReset;
