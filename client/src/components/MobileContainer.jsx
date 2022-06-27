import React, { useContext } from 'react';
import { SharedContext } from '../contexts/SharedContext';
import HeaderMobileChatFeed from './HeaderMobileChatFeed';
import ChatFeed from './ChatFeed';
import HeaderMobileChat from './HeaderMobileChat';
import Chat from './Chat';
import Settings from './Settings';
import styles from '../styles/MobileContainer.module.css';
import AddFriend from './AddFriend';

const MobileContainer = ({
  img,
  setImg,
  loading,
  user,
  previewUrl,
  attachImg,
  setAttachImg,
  user1,
  msgs,
  setText,
  text,
  handleSubmit,
  selectUser,
  users,
  chat,
}) => {
  const { showAddFriendComponent, showChatFeed, showChat, showSettings } =
    useContext(SharedContext);

  return (
    <div className={styles.mobile__main_container}>
      {showChatFeed ? (
        <div className={styles.mobile__main_container}>
          <HeaderMobileChatFeed />
          <ChatFeed
            selectUser={selectUser}
            users={users}
            user={user}
            chat={chat}
            user1={user1}
          />
        </div>
      ) : (
        ''
      )}
      {showChat ? (
        <div className={styles.mobile__main_container}>
          <HeaderMobileChat />
          <Chat
            user={user}
            previewUrl={previewUrl}
            attachImg={attachImg}
            setAttachImg={setAttachImg}
            user1={user1}
            msgs={msgs}
            setText={setText}
            text={text}
            handleSubmit={handleSubmit}
            chat={chat}
            selectUser={selectUser}
          />
        </div>
      ) : (
        ''
      )}
      {showSettings ? <Settings user={user} /> : ''}
      {showAddFriendComponent ? <AddFriend /> : ''}
    </div>
  );
};

export default MobileContainer;
