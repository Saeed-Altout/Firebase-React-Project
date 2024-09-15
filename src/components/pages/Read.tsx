import * as React from "react";
import firebase from "../../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { BeatLoader } from "react-spinners";

export default function Read() {
  const [notifications, setNotifications] = React.useState<
    { notification: string }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetch = async () => {
    const db = getDatabase(firebase);
    const dbRef = ref(db, "notifications/");
    try {
      setIsLoading(true);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setNotifications(Object.values(snapshot.val()));
      } else {
        setNotifications([]);
      }
      console.log("Data fetch successfully!");
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full flex-col gap-y-5">
      <button
        onClick={() => fetch()}
        className="bg-purple-700 text-white px-4 py-2 rounded-md"
      >
        {isLoading ? <BeatLoader color="#fff" size={10} /> : "Display Data"}
      </button>
      <ul className="border rounded-md bg-purple-50 p-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className="bg-white px-4 py-6 text-purple-950/90 capitalize font-semibold"
          >
            {notification?.notification}
          </li>
        ))}
      </ul>
    </div>
  );
}
