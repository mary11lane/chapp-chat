import React, { useContext } from 'react';
import theme from '../styles/globals.module.css';
import styles from '../styles/LogoutModal.module.css';
import { SharedContext } from '../contexts/SharedContext';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const LogOutModal = () => {
  const { isMobile, isDarkMode, toggleLogOutModalVisibility } =
    useContext(SharedContext);

  const navigate = useNavigate();
  const handleSignout = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate('/');
    toggleLogOutModalVisibility(false);
  };

  // MOBILE LAYOUT
  if (isMobile) {
    return <div></div>;
  }

  // DESKTOP LAYOUT
  return (
    <div id={isDarkMode ? theme.dark : theme.light} className={styles.desktop_container__main}>
      <div className={styles.desktop_wrapper__modal}>
        <h2 className={styles.desktop_modal_text}>Are you sure you would like to log out?</h2>
        <div className={styles.desktop_modal_buttons_wrapper}>
          <button className={styles.desktop_modal_button_no} onClick={() => {toggleLogOutModalVisibility(false)}}>No</button>
          <button className={styles.desktop_modal_button_yes} onClick={handleSignout}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
