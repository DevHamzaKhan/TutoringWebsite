import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function SendMessage({ receiverID }) {
  const [msg, setMsg] = useState('');
  const messagesRef = collection(db, 'messages');

  const sendMsg = async (e) => {
    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: msg,
      createdAt: serverTimestamp(),
      senderID: uid,
      receiverID: receiverID,
      photoURL: photoURL,
    });
    setMsg('');
  };

  return (
    <div>
      <input
        placeholder="Message..."
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button onClick={sendMsg}>Send</button>
    </div>
  );
}

export default SendMessage;
