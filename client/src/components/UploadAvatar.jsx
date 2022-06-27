import React, { useContext } from 'react';
import { SharedContext } from '../contexts/SharedContext';
import theme from '../styles/globals.module.css';
import styles from '../styles/UploadAvatar.module.css';

const UploadAvatar = ({ setImg, loading }) => {
  const { isMobile, isDarkMode, showUploadAvatarComponent, toggleUploadAvatarVisibility } =
    useContext(SharedContext);

  // MOBILE VERSION
  if (isMobile) {
    return (
      <div>
        <div>Upload Avatar</div>
      </div>
    );
  }

  // DESKTOP VERSION
  return (
    <div id={isDarkMode ? theme.dark : theme.light} className={styles.container__uploadavatar}>
      <div className={styles.wrapper__uploadavatar_form}>
        <form className={styles.uploadavatar__form}>
          <h2 className={styles.uploadavatar__header}>Upload Avatar</h2>
          {/* <input
            className={styles.uploadavatar__input}
            placeholder="<username>#0000"
          />
          <button type="submit" className={styles.uploadavatar__button}>
            Upload
  </button> */}

          <input
            type="file"
            accept="image/*"
            className={styles.uploadavatar__input}
            id="photo"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <button
            type="submit"
            className={styles.uploadavatar__button}
            disabled={loading}
          >
            Upload
          </button>
        </form>
        <span
          className={styles.uploadavatar__goback}
          onClick={() => {
            toggleUploadAvatarVisibility(!showUploadAvatarComponent);
          }}
        >
          Go Back to your Message Feed
        </span>
      </div>
    </div>
  );
};

export default UploadAvatar;
