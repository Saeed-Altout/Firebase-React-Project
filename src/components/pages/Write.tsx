import * as React from "react";
import app from "../../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";

export default function Write() {
  const [inputValue1, setInputValue1] = React.useState("");
  const [inputValue2, setInputValue2] = React.useState("");

  const save = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "posts/");
    const newPostRef = push(dbRef);
    set(newPostRef, {
      inputValue1: inputValue1,
      inputValue2: inputValue2,
    })
      .then(() => {
        console.log("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data: ", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        name="inputValue1"
        id="inputValue1"
        value={inputValue1}
        onChange={(e) => setInputValue1(e.target.value)}
      />
      <input
        type="text"
        name="inputValue2"
        id="inputValue2"
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
      />
      <br />
      <button onClick={save()}>Save</button>
    </div>
  );
}
