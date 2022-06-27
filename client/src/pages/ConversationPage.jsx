import React, { useState, useEffect, useContext } from 'react';
import { SharedContext } from '../contexts/SharedContext';
import DesktopContainer from '../components/DesktopContainer';
import MobileContainer from '../components/MobileContainer';
import { db, auth, storage } from '../firebase';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
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
  updateDoc,
  setDoc,
} from 'firebase/firestore';

const ConversationPage = () => {
  const { width, setWidth, isMobile, setIsMobile } = useContext(SharedContext);
  const [attachImg, setAttachImg] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [chat, setChat] = useState();
  const [text, setText] = useState();
  const [users, setUsers] = useState([]);
  const [msgs, setMsgs] = useState([]);

  const [img, setImg] = useState('');
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          setImg('');
        } catch (err) {
          console.log(err.message);
        }
      };
      try {
        await uploadImg();
      } catch (err) {
        err.message;
      }

      setLoading(false);
    }
  }, [img]);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    setIsMobile(width <= 768);
  }, [width]);
  useEffect(() => {
    // const usersRef = collection(db, 'users');
    const usersRef = collection(db, 'friends/friend', user1);
    const q = query(
      usersRef,
      where('uid', 'not-in', [auth.currentUser.uid], [user1])
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!attachImg) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(attachImg);
  }, [attachImg]);

  const selectUser = async (user) => {
    setChat(user);
    setPreviewUrl('');
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, 'messages', id, 'chat');
    const q = query(msgsRef, orderBy('createdAt', 'asc'));

    onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMsgs(messages);
    });
    const docSnap = await getDoc(doc(db, 'lastMsg', id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, 'lastMsg', id), { unread: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let url;

    if (attachImg === '') {
      if (text === '' || text.trim() === '') {
        return;
      }
    }

    try {
      if (attachImg) {
        const imgRef = ref(
          storage,
          `images/${new Date().getTime()} - ${attachImg.name}`
        );
        const snap = await uploadBytes(imgRef, attachImg);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }
      await addDoc(collection(db, 'messages', id, 'chat'), {
        // text,
        text: text || '',
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || '',
      });
    } catch (error) {
      console.log(error.message);
    }
    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || '',
      unread: true,
    });
    setText('');
    setAttachImg('');
    setPreviewUrl('');
  };

  return (
    <div>
      {isMobile ? (
        <MobileContainer
          img={img}
          setImg={setImg}
          loading={loading}
          user={user}
          previewUrl={previewUrl}
          attachImg={attachImg}
          setAttachImg={setAttachImg}
          user1={user1}
          msgs={msgs}
          setText={setText}
          text={text}
          handleSubmit={handleSubmit}
          selectUser={selectUser}
          chat={chat}
          users={users}
        />
      ) : (
        <DesktopContainer
          img={img}
          setImg={setImg}
          loading={loading}
          user={user}
          previewUrl={previewUrl}
          attachImg={attachImg}
          setAttachImg={setAttachImg}
          user1={user1}
          msgs={msgs}
          setText={setText}
          text={text}
          handleSubmit={handleSubmit}
          selectUser={selectUser}
          chat={chat}
          users={users}
        />
      )}
    </div>
  );
};

export default ConversationPage;
