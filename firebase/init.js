import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDfknAHxk74ECAwc_aIwWGYtyHr7Y-FA_g",
    authDomain: "milkshake-list.firebaseapp.com",
    databaseURL: "https://milkshake-list.firebaseio.com",
    projectId: "milkshake-list",
    storageBucket: "milkshake-list.appspot.com",
    messagingSenderId: "604115878985",
    appId: "1:604115878985:web:894e7765e073792c"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  //firebaseApp.firestore().settings({timestampsInSnapshots: true})
 
  //export firestore database
export default firebaseApp.firestore()