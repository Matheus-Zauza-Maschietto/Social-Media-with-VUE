import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyD339Guz9QsqQrGfWOB929FXbiwrB-anT4",
    authDomain: "sujeitopost-74896.firebaseapp.com",
    projectId: "sujeitopost-74896",
    storageBucket: "sujeitopost-74896.appspot.com",
    messagingSenderId: "190038142526",
    appId: "1:190038142526:web:fd2ea88456fb16608beb6f",
    measurementId: "G-06NK9F5ENC"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase