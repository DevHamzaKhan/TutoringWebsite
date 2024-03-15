import React, { useState } from "react";
import { db , auth} from "../firebase";
import { collection, doc, getDoc, updateDoc, arrayUnion , setDoc} from "firebase/firestore";

const SendMessage = ({ userId }) => {
  const [message, setMessage] = useState("");

  const handleMessageSend = async () => {
    if (!message.trim()) return;

    try {
      // Get the document reference for the user's messages
      const currentUser = auth.currentUser;
      const currentUserId = currentUser.uid;
      const userMessagesRef = doc(db, "Messages", currentUserId);
      const userMessagesDoc = await getDoc(userMessagesRef);

      if (userMessagesDoc.exists()) {
        // If the document exists, update the 'messages' array with the new message
        await updateDoc(userMessagesRef, {
          messages: arrayUnion({
            message: message,
            sentId: userId,
            timeSent: new Date() // Store time as a JavaScript Date object
          })
        });
      } else {
        // If the document does not exist, create it with the messages array containing the new message
        await setDoc(userMessagesRef, {
          messages: [{
            message: message,
            sentId: userId,
            timeSent: new Date()
          }]
        });
      }

      setMessage(""); // Clear the input field after sending the message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="send-message">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};

export default SendMessage;
