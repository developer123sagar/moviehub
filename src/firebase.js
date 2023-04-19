import { initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAraZOSu_DbPmjPyEkNsWNEc3yPMBxCi0o",
  authDomain: "moviehubproj2.firebaseapp.com",
  projectId: "moviehubproj2",
  storageBucket: "moviehubproj2.appspot.com",
  messagingSenderId: "117589405646",
  appId: "1:117589405646:web:108ed7e4faa5702639059f"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const usersInfo = collection(db, "usersInformations");