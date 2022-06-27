import React, { useRef, useEffect } from 'react';
import styles from '../styles/Chat.module.css';
import defaultProfilePic from '../assets/images-avatars/placeholder_avatar.png';

const ChatMessage = ({ msg, user1, chat, user }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);

  return (
    <div ref={scrollRef}>
      {msg.from === user1 ? (
        <div
          className={`${styles.desktop_wrapper__message} ${styles.desktop_wrapper__message_user}`}
        >
          <div className={styles.wrapper__media}>
            {msg.media ? <img className={styles.desktop_message_media} src={msg.media} alt={msg.text} /> : null}
          </div>

          {msg.text === '' ? (
            ''
          ) : (
            <div className={styles.desktop_message_user}>{msg.text}</div>
          )}
          <div className={styles.desktop_message__avatar_wrapper}>
            <img
              className={styles.desktop_message__avatar_image}
              src={user?.avatar || defaultProfilePic}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div
          className={`${styles.desktop_wrapper__message} ${styles.desktop_wrapper__message_friend}`}
        >
          <div className={styles.desktop_message__avatar_wrapper}>
            <img
              className={styles.desktop_message__avatar_image}
              src={chat.avatar || defaultProfilePic}
              alt=""
            />
          </div>
          {msg.media ? <img className={styles.desktop_message_media} src={msg.media} alt={msg.text} /> : null}
          {msg.text === '' ? '' : <div className={styles.desktop_message_friend}>{msg.text}</div> }
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
