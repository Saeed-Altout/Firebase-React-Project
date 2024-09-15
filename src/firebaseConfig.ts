import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebase = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebase);

export const requestFirebaseNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BHQBy_eJEwG-EjNQcVjmErksSk7L6OY0sSUp6qigUN3pktxJavCnY0WnAE_T76eUlHaxb2Uqeo7ETcg2b85cQBs", // VAPID key from Firebase Console
    });
    if (token) {
      return token;
    }
  } catch (err) {
    console.error("FCM Token generation failed:", err);
    return null;
  }
};

export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  }
};

export const onFirebaseMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export default firebase;
