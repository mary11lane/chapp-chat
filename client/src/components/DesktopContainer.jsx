import React, { useState, useEffect, useContext } from 'react';
import { SharedContext } from '../contexts/SharedContext';
import ChatFeed from './ChatFeed';
import Chat from './Chat';
import Settings from './Settings';
import AddFriend from './AddFriend';
import ChangePassword from './ChangePassword';
import UploadAvatar from './UploadAvatar';
import LogOutModal from './LogoutModal';
import styles from '../styles/DesktopContainer.module.css';
// import { storage, db, auth } from '../firebase';
// import {
//   ref,
//   getDownloadURL,
//   uploadBytes,
//   deleteObject,
// } from 'firebase/storage';
// import { getDoc, doc, updateDoc } from 'firebase/firestore';

const DesktopContainer = ({
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
  const {
    showAddFriendComponent,
    showUploadAvatarComponent,
    showChangePasswordComponent,
    showLogOutModal
  } = useContext(SharedContext);

  return (
    <div className={styles.container_desktop}>
      <ChatFeed
        selectUser={selectUser}
        users={users}
        user={user}
        chat={chat}
        user1={user1}
      />
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
      <Settings user={user} />
      {showAddFriendComponent ? <AddFriend /> : ''}
      {showUploadAvatarComponent ? (
        <UploadAvatar loading={loading} img={img} setImg={setImg} user={user} />
      ) : (
        ''
      )}
      {showChangePasswordComponent ? <ChangePassword /> : ''}
      {showLogOutModal ? <LogOutModal /> : ''}
    </div>
  );
};

export default DesktopContainer;
