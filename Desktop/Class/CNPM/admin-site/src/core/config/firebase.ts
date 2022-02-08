import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBFTcgvxkTVzziiIlEOhvoAbP1bLpTpwsg',
  authDomain: 'womart-3a686.firebaseapp.com',
  projectId: 'womart-3a686',
  storageBucket: 'womart-3a686.appspot.com',
  messagingSenderId: '761325889031',
  appId: '1:761325889031:web:a95b7a85155033038eeca2',
  measurementId: 'G-Y65TNJYHSL',
};

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export const authentication = getAuth(app);
authentication.useDeviceLanguage();

export const googleProvider = new GoogleAuthProvider();

export const fbProvider = new FacebookAuthProvider();
