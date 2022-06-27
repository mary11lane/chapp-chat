import React, { useContext, useEffect, useState } from 'react';
import { SharedContext } from '../contexts/SharedContext';
import moment from 'moment';
import theme from '../styles/globals.module.css';
import styles from '../styles/ChatPreview.module.css';
import defaultProfilePic from '../assets/images-avatars/placeholder_avatar.png';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';

const ChatPreview = ({ chat, user1, selectUser, currUser, user }) => {
  const {
    isMobile,
    isDarkMode,
    toggleChatVisibility,
    toggleChatFeedVisibility,
    chosenUser, setChosenUser
  } = useContext(SharedContext);
  const user2 = currUser?.uid;
  const [data, setData] = useState('');
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, 'lastMsg', id), (doc) => {
      setData(doc.data());
    });

    return () => unsub;
  }, []);

  // console.log(currUser);

  const selectedUser =
    chat?.uid === currUser.uid ? styles.desktop_selected_user : '';

  // MOBILE STYLES
  if (isMobile) {
    return (
      <div
        className={styles.mobile_chatcard__wrapper}
        onClick={() => {
          toggleChatVisibility(true);
          toggleChatFeedVisibility(false);
        }}
      >
        <div className={styles.mobile_chatcard__avatar_wrapper}>
          <img
            className={styles.mobile_chatcard__avatar_image}
            src={currUser.avatar}
          />
        </div>
        <div className={styles.mobile_chatcard__text_wrapper}>
          <p className={styles.mobile_chatcard__text_sender}>{currUser.name}</p>
          <p className={styles.mobile_chatcard__text_messages}>
            {/* {messageObject.message} */}
            {/*{`${messageObject.message} ${moment(messageObject.timestamp).fromNow()}`} */}
          </p>
        </div>
        <div className={styles.mobile_chatcard__timestamp}>
          {moment(messageObject.timestamp).fromNow()}
        </div>
      </div>
    );
  }

  // DESKTOP STYLES
  return (
    <div
      className={`${styles.desktop_wrapper__chatpreview} ${selectedUser} `}
      id={isDarkMode ? theme.dark : theme.light}
      onClick={() => {
        setChosenUser(currUser.uid);
        selectUser(currUser);
        // code to show message in Chat.jsx component
      }}
    >
      <div className={styles.desktop_chatpreview__wrapper_avatar}>
        <img
          className={styles.desktop_avatar__image}
          src={currUser.avatar || defaultProfilePic}
        />
        {currUser.isOnline ? (
          <span className={styles.user_status_online}></span>
        ) : (
          <span className={styles.user_status_offline}></span>
        )}
      </div>
      <div className={styles.desktop_chatpreview__wrapper_text}>
        <div className={styles.desktop_text__friendname}>
          {currUser.name}
          {data?.from !== user1 && data?.unread && (
            <span className={styles.desktop_new_message_notif}> NEW</span>
          )}
        </div>
        <div className={styles.desktop_chat_text_preview}>
          {data && (
            <p className={styles.desktop_text__message}>
              {data.from === user1 ? <strong>Me: </strong> : null}
              {data.media !== '' ? 'Sent a Photo.' : data.text}
            </p>
          )}
        </div>
        {data ? (
          <div className={styles.desktop_timestamp}>
            {moment(data.createdAt.toDate()).fromNow()}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ChatPreview;
