import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD7n2oBNmZ_nnf7I1-KBgKWrsN3_x1Vv4g",
  authDomain: "evernote-d71c2.firebaseapp.com",
  databaseURL: "https://evernote-d71c2.firebaseio.com",
  projectId: "evernote-d71c2",
  storageBucket: "evernote-d71c2.appspot.com",
  messagingSenderId: "526978610615",
  appId: "1:526978610615:web:0c71098524498fe8432432",
  measurementId: "G-0G9B1VJWHF",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage };
export default db;
