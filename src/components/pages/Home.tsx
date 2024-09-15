import * as React from "react";
import {
  requestFirebaseNotificationPermission,
  registerServiceWorker,
  onFirebaseMessageListener,
} from "../../firebaseConfig";

interface NotificationProps {
  title: string;
  body: string;
}
export default function Home() {
  const [notification, setNotification] = React.useState<NotificationProps>({
    title: "",
    body: "",
  });

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
        setNotification({
          title: payload?.notification?.title,
          body: payload?.notification?.body,
        });
      })
      .catch((err) => {
        console.error("Error receiving foreground message:", err);
      });
  }, []);
  return (
    <div className="flex justify-center items-center w-full h-screen">
      {notification.title && notification.body ? (
        <div className="relative border px-4 py-3 rounded-md max-w-sm">
          <div className="absolute bg-purple-500 h-4 w-4 rounded-full -right-2 -top-2"></div>
          <h3 className="text-lg">{notification.title}</h3>
          <p className="text-gray-500 text-sm">{notification.body}</p>
        </div>
      ) : (
        <p className="text-gray-500">No Notification</p>
      )}
    </div>
  );
}
