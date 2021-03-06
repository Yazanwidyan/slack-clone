import React, { useState } from "react";
import "./ChatInput.css";
import { useStateValue } from "../../ContextAPI/StateProvider";
import db from "../../firebase";
// import firebase from "firebase";

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      db.collection("rooms").doc(channelId).collection("messages").add({
        message: input,
        timestamp: new Date(),
        user: user.displayName,
        userImage: user.photoURL,
      });
    }
  };
  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`message #${channelName?.toLowerCase()}`}
        />
        <button onClick={sendMessage} type="submit">
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
