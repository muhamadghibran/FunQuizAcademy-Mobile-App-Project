import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getReactNativePersistence } = require("firebase/auth") as any;
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration (funquiz-academy project)
const firebaseConfig = {
  apiKey: "AIzaSyCo54pCXL7qrMQaLb6eqd7VQ9jmwyltPLw",
  authDomain: "funquiz-academy.firebaseapp.com",
  projectId: "funquiz-academy",
  storageBucket: "funquiz-academy.firebasestorage.app",
  messagingSenderId: "872676563356",
  appId: "1:872676563356:android:856680aed08e6a68f95059",
};

// Initialize Firebase
let app: any;
let auth: any;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  // Initialize Auth with persistence for React Native
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

export { app, auth };
