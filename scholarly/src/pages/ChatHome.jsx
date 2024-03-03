import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";
import SendMessage from "./SendMessage";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const ChatHome = () => {
  const [messages, setMessages] = useState([]);
  const currentUser = auth.currentUser;
  const userID = currentUser ? currentUser.uid : null;

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"), limit(50));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
        <Navigation></Navigation>
        <div>
        {messages &&
            messages.map((message, id) => (
            <div
                key={id}
                className={`msg ${userID === message.uid ? "sent" : "received"}`}
            >
                <img src={message.photoURL} alt="User Avatar" />
                <p>{message.text}</p>
            </div>
            ))}
        <SendMessage />
        </div>
    </>
  );
};

export default ChatHome;
