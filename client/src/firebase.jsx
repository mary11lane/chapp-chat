import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: 'AIzaSyCL_YZK7Tap-kz9MvlJuoAsEC6VpqNl7U0',
//   authDomain: 'chat-app-official-9f0ee.firebaseapp.com',
//   projectId: 'chat-app-official-9f0ee',
//   storageBucket: 'chat-app-official-9f0ee.appspot.com',
//   messagingSenderId: '234039602872',
//   appId: '1:234039602872:web:bc3374219f6b08c1de8e4d',
//   measurementId: 'G-QDG1CZ0LNM',
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyBrdKvHKuOLQvDG7SU1isAQZ3TmUiiSywg",
//   authDomain: "chat-app-official-2.firebaseapp.com",
//   projectId: "chat-app-official-2",
//   storageBucket: "chat-app-official-2.appspot.com",
//   messagingSenderId: "401135317678",
//   appId: "1:401135317678:web:0da9d15e5117a6dafd333f",
//   measurementId: "G-EH71WJRSP2",
// };

// const firebaseConfig = {
//   apiKey: 'AIzaSyDiRzMofiuZPzzNoEnyBQ06yqYDGz7tzyU',
//   authDomain: 'react-app-8fe7e.firebaseapp.com',
//   projectId: 'react-app-8fe7e',
//   storageBucket: 'react-app-8fe7e.appspot.com',
//   messagingSenderId: '326013788352',
//   appId: '1:326013788352:web:9000b429adb010ba468d25',
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyCzIsP-ATaPAe5z-geLtk2B6uIXOvb4E_U",
//   authDomain: "chapp-7c981.firebaseapp.com",
//   databaseURL:
//     "https://chapp-7c981-default-rtdb.asia-southeast1.firebasedatabase.app/",
//   projectId: "chapp-7c981",
//   storageBucket: "chapp-7c981.appspot.com",
//   messagingSenderId: "566770331588",
//   appId: "1:566770331588:web:40e8b49ad5fb5ee2617e91",
// };

// Document 5
const firebaseConfig = {
  apiKey: "AIzaSyDTLktW_Qy0Vm4cdLnefhSLWDLUlY8PSAs",
  authDomain: "auth-try-1eab5.firebaseapp.com",
  projectId: "auth-try-1eab5",
  storageBucket: "auth-try-1eab5.appspot.com",
  messagingSenderId: "949377894898",
  appId: "1:949377894898:web:866d9a32603e016c10436b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
