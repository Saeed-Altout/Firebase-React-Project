import * as React from "react";
import {
  requestFirebaseNotificationPermission,
  registerServiceWorker,
  onFirebaseMessageListener,
} from "../../firebaseConfig";

export default function Home() {
  React.useEffect(() => {
    requestFirebaseNotificationPermission().then((token) => {
      if (token) {
        console.log("Token received:", token);
      }
    });

    registerServiceWorker();

    onFirebaseMessageListener()
      .then((payload) => {
        console.log("Message received in foreground: ", payload);
      })
      .catch((err) => {
        console.error("Error receiving foreground message:", err);
      });
  }, []);
  return <div>Home</div>;
}
