import React, { useEffect, useState, useContext } from "react";
import { SharedContext } from "../contexts/SharedContext";
import ChatPreview from "./ChatPreview";
import theme from "../styles/globals.module.css";
import styles from "../styles/ChatFeed.module.css";
import defaultProfilePic from "../assets/images-avatars/placeholder_avatar.png";

import { db, auth } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const ChatFeed = ({ user, chat, user1, selectUser, users }) => {
  const {
    isMobile,
    isDarkMode,
    showAddFriendComponent,
    toggleAddFriendVisibility,
  } = useContext(SharedContext);

  const [usersData, setUsersData] = useState([]);
  const [friendsData, setFriendsData] = useState([]);
  const loggedUser = auth.currentUser.uid;

  const getUsersData = () => {
    const usersRef = collection(db, "users");
    // const friendsRef = collection(db, "friends/friend", loggedUser);
    const q = query(
      usersRef,
      where("uid", "not-in", [auth.currentUser.uid], [user1])
    );
    onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsersData(users);
    });
  };
  // friends data
  const getFriendsData = () => {
    const friendsRef = collection(db, "friends/friend", loggedUser);
    const q = query(
      friendsRef,
      where("uid", "not-in", [auth.currentUser.uid], [user1])
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setFriendsData(users);
    });
  };

  // console.log("users: ", usersData);
  // console.log("friends: ", friendsData);

  friendsData?.map((friend) => {
    const c = usersData?.find((chat) => friend.email === chat.email);

    if (c !== undefined) {
      const {
        uid,
        isOnline,
        avatarPath = "avatar/placeholder_avatar.png",
        avatar = "https://firebasestorage.googleapis.com/v0/b/auth-try-1eab5.appspot.com/o/avatar%2Fplaceholder_avatar.png?alt=media&token=a938cf30-5786-4e47-b17b-90dd4d580536",
      } = c;
      setTimeout(async () => {
        await updateDoc(doc(db, `friends/friend/${loggedUser}/${uid}/`), {
          isOnline,
          avatarPath,
          avatar,
        });
      }, 1500);
    }
  });

  useEffect(() => {
    getUsersData();
    getFriendsData();
  }, []);

  // MOBILE VERSION
  if (isMobile) {
    return (
      <div className={styles.mobile_chatfeed__wrapper}>
        {/*<h2 style={{ color: 'red' }}>Messages</h2>*/}
        {sampleData2.map((messageObject) => (
          <ChatPreview messageObject={messageObject} />
        ))}
      </div>
    );
  }

  // DESKTOP VERSION

  return (
    <div
      id={isDarkMode ? theme.dark : theme.light}
      className={styles.desktop_chatfeed__wrapper}
    >
      <div className={styles.desktop_chatfeed__header_wrapper}>
        <h2 className={styles.desktop_chatfeed__header_text}>Messages</h2>
        <button
          className={styles.desktop_chatfeed__header_button}
          onClick={() => {
            toggleAddFriendVisibility(!showAddFriendComponent);
          }}
        >
          <i className="fas fa-solid fa-user-plus"></i>
        </button>
      </div>
      <div className={styles.desktop_chatfeed__previews__wrapper}>
        {users.map((currUser) => (
          <ChatPreview
            user={user}
            user1={user1}
            chat={chat}
            key={currUser.uid}
            currUser={currUser}
            selectUser={selectUser}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatFeed;
