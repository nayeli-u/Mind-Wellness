// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApcbmPyZ1gjBSN2gC8Xz5mVWhoMu46YGs",
  authDomain: "mind-wellness-a3242.firebaseapp.com",
  projectId: "mind-wellness-a3242",
  storageBucket: "mind-wellness-a3242.appspot.com",
  messagingSenderId: "183796764396",
  appId: "1:183796764396:web:53657eaec8809296fcdfc9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app };
