import * as React from "react";
import firebase from "../../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";

export default function Write() {
  const [notification, setNotification] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const send = async () => {
    const db = getDatabase(firebase);
    const dbRef = ref(db, "notifications/");
    const newPostRef = push(dbRef);
    try {
      setIsLoading(true);
      set(newPostRef, {
        notification: notification,
      });
      console.log("Data saved successfully!");
      setNotification("");
    } catch (error) {
      console.error("Error saving data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full flex-col gap-y-5">
      <input
        type="text"
        name="inputValue1"
        id="inputValue1"
        value={notification}
        placeholder="Enter your message"
        onChange={(e) => setNotification(e.target.value)}
        className="border border-md py-2 px-4 w-full max-w-md"
      />
      <button
        onClick={() => send()}
        className="bg-purple-700 text-white px-4 py-2 rounded-md"
      >
        {isLoading ? "...Loading" : "Send"}
      </button>
    </div>
  );
}
