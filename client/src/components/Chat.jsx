import React, { useEffect, useState, useContext } from 'react';
import { SharedContext } from '../contexts/SharedContext';
import defaultProfilePic from '../assets/images-avatars/placeholder_avatar.png';
import theme from '../styles/globals.module.css';
import styles from '../styles/Chat.module.css';
import ChatMessage from './ChatMessage';
import EmptyStateImage from '../assets/other-images/empty-state.png';

const Chat = ({
  previewUrl,
  attachImg,
  setAttachImg,
  user,
  user1,
  msgs,
  chat,
  text,
  setText,
  handleSubmit,
}) => {
  const {
    isMobile,
    isDarkMode,
    showAddFriendComponent,
    toggleAddFriendVisibility,
    chosenUser, setChosenUser
  } = useContext(SharedContext);
  const [msgsCopy, setMsgsCopy] = useState([]);

  useEffect(() => {
    if (msgsCopy[0]?.to === chosenUser || msgsCopy[0]?.from === chosenUser) {
      return;
    } else {
      setMsgsCopy([]);
    }
  }, [chosenUser]);

  useEffect(() => {
    if (msgs[0]?.to === chosenUser || msgs[0]?.from === chosenUser) {
      setMsgsCopy([...msgs]);
    }
  }, [msgs]);

  const loggedInUserId = '6AYHXtSfMR';
  const friendInfo = {
    name: 'Mango Gills',
    online: true,
    avatar: defaultProfilePic,
  };

  const generateKey = () => {
    return `${user1} + ${Date.now()} + ${Math.random()}`;
  }

  // Mobile Version
  if (isMobile) {
    return (
      <div className={styles.mobile_container__chat}>
        <div className={styles.mobile_wrapper__messages}>
          {sampleChatData.map((message) =>
            message.senderId === loggedInUserId ? (
              <div
                className={`${styles.mobile_wrapper__message} ${styles.mobile_wrapper__message_user}`}
              >
                <div className={styles.mobile_message_user}>
                  {message.message}
                </div>
                <div className={styles.mobile_message__avatar_wrapper}>
                  <img
                    className={styles.mobile_message__avatar_image}
                    src={defaultProfilePic}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div
                className={`${styles.mobile_wrapper__message} ${styles.mobile_wrapper__message_friend}`}
              >
                <div className={styles.mobile_message__avatar_wrapper}>
                  <img
                    className={styles.mobile_message__avatar_image}
                    src={defaultProfilePic}
                    alt=""
                  />
                </div>
                <div className={styles.mobile_message_friend}>
                  {message.message}
                </div>
              </div>
            )
          )}
        </div>
        <form
          className={styles.mobile_wrapper__form}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              // insert code for accepting message data
            }
          }}
        >
          <label className={styles.mobile_form__button_addphoto}>
            <input
              id="image_input"
              type="file"
              accept="image/*"
              className={styles.mobile_button_addphoto_input}
              onChange={() => {
                togglePhotoButtonClicked(!photoButtonClicked);
              }}
            />
          </label>
          <textarea
            className={styles.mobile_form__textarea}
            placeholder="Start writing your message...."
          ></textarea>
          {/*<button className={styles.mobile_form__button_send} type="submit">
            </button>*/}
        </form>
      </div>
    );
  }

  // Desktop Version

  return (
    <div
      id={isDarkMode ? theme.dark : theme.light}
      className={styles.desktop_container__chat}
    >
      {chat ? (
        <div className={styles.desktop_container_inner__chat}>
          <div className={styles.desktop_wrapper__header}>
            <div className={styles.desktop_wrapper__friendavatar}>
              <img
                className={styles.desktop_friendavatar_image}
                src={chat?.avatar || defaultProfilePic}
                alt=""
              />
            </div>
            <div className={styles.desktop_wrapper__friendinfo}>
              <h2 className={styles.desktop_friendInfo_name}>{chat.name}</h2>
              <div className={styles.desktop_wrapper__friendinfo_status}>
                <span
                  className={
                    chat.isOnline
                      ? styles.desktop_friendinfo__status_indicator_online
                      : styles.desktop_friendinfo__status_indicator_offline
                  }
                ></span>
                <span className={styles.desktop_friendinfo__status}>
                  {chat.isOnline ? 'online' : 'offline'}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.desktop_wrapper__messages}>
            {msgsCopy.length
              ? msgsCopy.map((msg) => (
                  <ChatMessage
                    key={generateKey()}
                    msg={msg}
                    user1={user1}
                    chat={chat}
                    user={user}
                  />
                ))
              : null}
          </div>
          <form
            className={styles.desktop_wrapper__form}
            onSubmit={handleSubmit}
          >
            {previewUrl !== '' ? (
              <div className={styles.desktop_form__textarea}>
                <img
                  className={styles.desktop_preview_image}
                  src={previewUrl}
                  alt="previewImage"
                />
              </div>
            ) : (
              <textarea
                className={styles.desktop_form__textarea}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start writing your message...."
              ></textarea>
            )}
            <div className={styles.desktop_wrapper_form_buttons}>
              <label className={styles.desktop_form__button_addphoto}>
                <input
                  id="image_input"
                  type="file"
                  accept="image/*"
                  className={styles.desktop_button_addphoto_input}
                  onChange={(e) => setAttachImg(e.target.files[0])}
                />
              </label>
              <button
                className={styles.desktop_form__button_send}
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.desktop_container__empty_state}>
          <img
            className={styles.desktop_container__empty_state_image}
            src={EmptyStateImage}
            alt=""
          />
          <h3 className={styles.desktop_container__empty_state_text}>
            Select a friend from the left panel to get started!
          </h3>
          <h3 className={styles.desktop_container__empty_state_text}>
            or{' '}
            <span
              className={styles.desktop_container__empty_state_text_addfriend}
              onClick={() => {
                toggleAddFriendVisibility(!showAddFriendComponent);
              }}
            >
              Add a friend?
            </span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Chat;
