importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBSENzCO0wL8GffF4BnWI2q9vb2es_aijI",
  authDomain: "react-firebase-22079.firebaseapp.com",
  projectId: "react-firebase-22079",
  databaseURL: "https://react-firebase-22079-default-rtdb.firebaseio.com/",
  storageBucket: "react-firebase-22079.appspot.com",
  messagingSenderId: "774375092572",
  appId: "1:774375092572:web:b44cc5212c049812699199",
  measurementId: "G-C469VBM4HN",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background Message received: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
