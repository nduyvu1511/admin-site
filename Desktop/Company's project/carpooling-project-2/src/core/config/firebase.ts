// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase, ref } from "firebase/database"
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBFTcgvxkTVzziiIlEOhvoAbP1bLpTpwsg",
  authDomain: "womart-3a686.firebaseapp.com",
  databaseURL:
    "https://womart-3a686-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "womart-3a686",
  storageBucket: "womart-3a686.appspot.com",
  messagingSenderId: "761325889031",
  appId: "1:761325889031:web:a95b7a85155033038eeca2",
  measurementId: "G-Y65TNJYHSL",
}

const app = initializeApp(firebaseConfig)
export const authentication = getAuth(app)
authentication.useDeviceLanguage()
export const googleProvider = new GoogleAuthProvider()
export const fbProvider = new FacebookAuthProvider()
export const db = getDatabase(app)


