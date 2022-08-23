import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRKzP1Rm9ZijqVCUHSXoAlvoG_KFCpi5s",
  authDomain: "restaurant-app-mbk.firebaseapp.com",
  databaseURL: "https://restaurant-app-mbk-default-rtdb.firebaseio.com",
  projectId: "restaurant-app-mbk",
  storageBucket: "restaurant-app-mbk.appspot.com",
  messagingSenderId: "267847211162",
  appId: "1:267847211162:web:4f721d15bb7974f2da6723",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
