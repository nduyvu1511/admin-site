importScripts("https://www.gstatic.com/firebasejs/9.8.1/firebase-app-compat.js")
importScripts(
  "https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging-compat.js"
)

// Initialize the Firebase app in the service worker by passing the generated config
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
firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  // console.log("Received background message ", payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions)
})
