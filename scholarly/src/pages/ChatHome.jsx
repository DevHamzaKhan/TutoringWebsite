import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";
import SendMessage from "./SendMessage";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  getDoc
} from "firebase/firestore";

const ChatHome = ({ initialUser = null }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(initialUser);
  const [messages, setMessages] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "Users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
      const currentUser = auth.currentUser;
      const currentUserId = currentUser.uid;
      setCurrentId(currentUserId.uid)
    };

    fetchUsers();

    const unsubscribe = onSnapshot(collection(db, "Users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    getMessages(userId);
  };

  const getMessages = async (userId) => {
    try {
        console.log("Fetching messages...");
        const currentUser = auth.currentUser;
        if (currentUser) {
            const currentUserId = currentUser.uid;
            setCurrentId(currentUserId);
            console.log("Current User ID:", currentUserId);
            
            // Reference to the "Messages" document for the current user
            const userMessagesRef = doc(db, "Messages", currentUserId);
            const userMessagesRef2 = doc(db, "Messages", userId);
            console.log("userMessagesRef:", userMessagesRef);

            // Fetch the document data from Firestore
            const userMessagesDoc = await getDoc(userMessagesRef);
            const userMessagesDoc2 = await getDoc(userMessagesRef2);
            console.log("User Messages Doc:", userMessagesDoc.data());

            // Access the "messages" array within the document data
            const messagesArray = userMessagesDoc.data().messages || [];
            const messagesArray2 = userMessagesDoc2.data().messages || [];
            console.log("Messages Array:", messagesArray);

            // Filter messages sent by the user with the given userId
            const userMessages = messagesArray.filter(message => message.sentId === userId);
            const userMessages2 = messagesArray2.filter(message => message.sentId === currentUserId);
            console.log("User Messages:", userMessages);

            // Set messages state by concatenating the two arrays
            setMessages(userMessages.concat(userMessages2));
        }
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
};

  return (
    <>
      <Navigation />
      <div className="users-container">
        {users.map((user) => (
          <div key={user.id} className="user">
            <button onClick={() => handleUserClick(user.id)}>
              {user.firstName} {user.lastName}
            </button>
            {selectedUserId === user.id && (
              <div className="message-panel">
                <h3>Send Message to {user.firstName}</h3>
                <SendMessage userId={user.id} />
                <div className="messages-container">
                  {messages.map((message) => (
                    <div key={message.id} className="message">
                      <p><strong>{message.sentId === currentId ? "You" : user.firstName}:</strong> {message.message}</p>
                      <p><small>Sent at: {new Date(message.timeSent.seconds * 1000).toLocaleString()}</small></p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
  
};

export default ChatHome;
