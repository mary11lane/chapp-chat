import React, { useContext, useState } from 'react';
import { SharedContext } from '../contexts/SharedContext';
import theme from '../styles/globals.module.css';
import styles from '../styles/AddFriend.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, setDoc, doc } from 'firebase/firestore';

const AddFriend = () => {
  const {
    isMobile,
    isDarkMode,
    toggleChatFeedVisibility,
    showAddFriendComponent,
    toggleAddFriendVisibility,
  } = useContext(SharedContext);
  if (isMobile) {
    return (
      <div className={styles.mobile_container__addfriend}>
        <div className={styles.mobile_wrapper__addfriend_form}>
          <form className={styles.mobile_addfriend__form}>
            <h2 className={styles.mobile_addfriend__header}>Find a friend</h2>
            <input
              className={styles.mobile_addfriend__input}
              placeholder="<username>#0000"
            />
            <button type="submit" className={styles.mobile_addfriend__button}>
              Start Talking
            </button>
          </form>
          <span
            className={styles.mobile_addfriend__goback}
            onClick={() => {
              toggleAddFriendVisibility(!showAddFriendComponent);
              toggleChatFeedVisibility(true);
            }}
          >
            Go Back to your Message Feed
          </span>
        </div>
      </div>
    );
  }

  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState([]);
  const [chatEmail, setChatEmail] = useState('');
  const [snapshot, loading, error] = useCollection(collection(db, 'users'));
  const chatUsers = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const getFriend = () => {
    const c = chatUsers?.find((chat) => chat.email == chatEmail);

    const {
      name,
      email,
      uid,
      createdAt,
      isOnline,
      avatarPath = 'avatar/placeholder_avatar.png',
      avatar = 'https://firebasestorage.googleapis.com/v0/b/chat-app-official-9f0ee.appspot.com/o/avatar%2Fplaceholder_avatar.png?alt=media&token=97695394-a2cd-48d7-8391-261430cd4769',
    } = c;

    if (c.email == chatEmail) {
      setTimeout(async () => {
        await setDoc(doc(db, `friends/friend/${user.uid}/${uid}/`), {
          name,
          email,
          uid,
          createdAt,
          isOnline,
          avatarPath,
          avatar,
        });
      }, 1500);
      getUser(uid);
    }
  };

  const getUser = (id) => {
    const c = chatUsers?.find((chat) => chat.email == user.email);

    const {
      name,
      email,
      uid,
      createdAt,
      isOnline,
      avatarPath = 'avatar/placeholder_avatar.png',
      avatar = 'https://firebasestorage.googleapis.com/v0/b/chat-app-official-9f0ee.appspot.com/o/avatar%2Fplaceholder_avatar.png?alt=media&token=97695394-a2cd-48d7-8391-261430cd4769',
    } = c;

    if (c.email == user.email) {
      setTimeout(async () => {
        await setDoc(doc(db, `friends/friend/${id}/${uid}/`), {
          name,
          email,
          uid,
          createdAt,
          isOnline,
          avatarPath,
          avatar,
        });
      }, 1500);
    }
  };

  //
  const addFriend = async () => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const findUser = chatUsers?.find((chat) => chat.email == chatEmail);
    if (findUser) {
      setUserData(findUser);
      if (chatEmail.match(mailformat) && chatEmail !== user.email) {
        successAddEmail();
        getFriend();
        setChatEmail('');
      } else {
        errorAddEmail();
        setChatEmail('');
      }
    } else {
      emailNotFound();
      setChatEmail('');
    }
  };

  //   toast notifications
  const successAddEmail = () => {
    toast.success('Email Added!', {
      autoClose: 2000,
      pauseOnHover: false,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      hideProgressBar: true,
      position: 'top-center',
    });
  };

  const errorAddEmail = () =>
    toast.error('Invalid email address!', {
      autoClose: 2000,
      pauseOnHover: false,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      hideProgressBar: true,
      position: 'top-center',
    });

  const emailNotFound = () => {
    toast.warn('Email not found', {
      autoClose: 2000,
      pauseOnHover: false,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      hideProgressBar: true,
      position: 'top-center',
    });
  };

  return (
    <div
      id={isDarkMode ? theme.dark : theme.light}
      className={styles.desktop_container__addfriend}
    >
      <div className={styles.desktop_wrapper__addfriend_form}>
        <form
          className={styles.desktop_addfriend__form}
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className={styles.desktop_addfriend__header}>Find a friend</h2>
          <input
            className={styles.desktop_addfriend__input}
            placeholder="Email"
            value={chatEmail}
            onChange={(e) => setChatEmail(e.target.value)}
          />
          <button
            type="submit"
            className={styles.desktop_addfriend__button}
            onClick={() => addFriend()}
          >
            Start Talking
          </button>
        </form>
        <span
          className={styles.desktop_addfriend__goback}
          onClick={() => {
            toggleAddFriendVisibility(!showAddFriendComponent);
          }}
        >
          Go Back to your Message Feed
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddFriend;
