import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

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
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
