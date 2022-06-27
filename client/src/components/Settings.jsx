import React, { useContext } from 'react';
import { SharedContext } from '../contexts/SharedContext';
import theme from '../styles/globals.module.css';
import styles from '../styles/Settings.module.css';
import defaultProfilePic from '../assets/images-avatars/placeholder_avatar.png';
import DarkModeToggle from './DarkModeToggle';
import exitIcon from '../assets/icons/close.svg';
import editIcon from '../assets/icons/edit_white.svg';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const sampleLoggedInUser = {
  name: 'Ruth Rodriguez',
  online: true,
  email: 'rrodriguez@gmail.com',
  password: 'pw1234',
};

const Settings = ({ user }) => {
  const {
    isMobile,
    isDarkMode,
    showUploadAvatarComponent,
    toggleUploadAvatarVisibility,
    showChangePasswordComponent,
    toggleChangePasswordVisibility,
    toggleSettingsVisibility,
    toggleChatFeedVisibility,
    toggleLogOutModalVisibility
  } = useContext(SharedContext);

  //Mobile Version
  if (isMobile) {
    return (
      <div className={styles.mobile_container_settings}>
        <div className={styles.mobile_wrapper_exit_button}>
          <button
            className={styles.mobile_exit_button}
            onClick={() => {
              toggleSettingsVisibility(false);
              toggleChatFeedVisibility(true);
            }}
          >
            <img
              className={styles.mobile_exit_button_image}
              src={exitIcon}
              alt=""
            />
          </button>
        </div>
        <div className={styles.mobile_wrapper_profile}>
          <div className={styles.mobile_wrapper_avatar}>
            <img
              className={styles.mobile_avatar_image}
              src={defaultProfilePic}
              alt=""
            />
            <form className={styles.mobile_wrapper_change_avatar}>
              <label className={styles.mobile_label_change_avatar}>
                <input
                  className={styles.mobile_input_change_avatar}
                  id="image_input"
                  type="file"
                  accept="image/*"
                  onChange={() => {
                    togglePhotoButtonClicked(!photoButtonClicked);
                  }}
                />
              </label>
            </form>
          </div>
          <div className={styles.mobile_wrapper_user_info}>
            <p className={styles.mobile_profile_userinfo_name}>
              {sampleLoggedInUser.name}
            </p>
            <p className={styles.mobile_profile_userinfo_email}>
              {sampleLoggedInUser.email}
            </p>
          </div>
        </div>
        <div className={styles.mobile_wrapper_form}>
          <form className={styles.mobile_form}>
            <label className={styles.mobile_label_change_name}>Name</label>
            <input
              className={styles.mobile_input_change_name}
              value={sampleLoggedInUser.name}
              type="text"
              disabled={true}
            />

            <label className={styles.mobile_label_change_email}>Email</label>
            <input
              className={styles.mobile_input_change_email}
              value={sampleLoggedInUser.email}
              type="email"
              disabled={true}
            />

            <label className={styles.mobile_label_change_password}>
              Password
            </label>
            <input
              className={styles.mobile_input_change_password}
              value={sampleLoggedInUser.password}
              type="password"
              onChange={() => {
                //insert code here to change state, and bind 2-way
              }}
            />

            <button className={styles.mobile_submit_changes} type="submit">
              Update
            </button>
          </form>
        </div>
        <div className={styles.mobile_wrapper_buttons}>
          <div className={styles.mobile_wrapper_darkmode}>
            <span className={styles.mobile_darkmode_text}>Dark Mode</span>
            <DarkModeToggle />
          </div>
          <button className={styles.mobile_button_darkmode}>Signout</button>
        </div>
      </div>
    );
  }
  // const navigate = useNavigate();
  // const handleSignout = async () => {
  //   await updateDoc(doc(db, 'users', auth.currentUser.uid), {
  //     isOnline: false,
  //   });
  //   await signOut(auth);
  //   navigate('/');
  // };
  // Desktop Style
  return (
    <div  id={isDarkMode ? theme.dark : theme.light} className={styles.desktop_container_settings}>
      <div className={styles.desktop_wrapper_profile}>
        <div className={styles.desktop_wrapper__image}>
          <img
            className={styles.desktop_profile__image}
            src={user?.avatar || defaultProfilePic}
            alt=""
          />
        </div>
        <h2 className={styles.desktop_profile__name}>{user?.name}</h2>
        <span className={styles.desktop_profile__status}>
          <span
            className={
              sampleLoggedInUser.online
                ? styles.desktop_profile__status_indicator_online
                : styles.desktop_profile__status_indicator_offline
            }
          ></span>{' '}
          {sampleLoggedInUser.online ? 'online' : 'offline'}
        </span>
      </div>
      <div className={styles.desktop_wrapper__settings}>
        <h3 className={styles.desktop_settings_header}>Settings</h3>
        <div
          className={styles.desktop_settings_option}
          onClick={() => {
            toggleUploadAvatarVisibility(!showUploadAvatarComponent);
          }}
        >
          Upload profile picture
        </div>
        <div
          className={styles.desktop_settings_option}
          onClick={() => {
            toggleChangePasswordVisibility(!showChangePasswordComponent);
          }}
        >
          Update password
        </div>
      </div>
      <div className={styles.desktop_wrapper__darkmode}>
        <span className={styles.desktop_darkmode_label}>{isDarkMode? 'Dark' : 'Light' } Mode</span>
        <DarkModeToggle />
      </div>
      <button
        className={styles.desktop_settings__button_logout}
        onClick={() => {toggleLogOutModalVisibility(true)}}
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
