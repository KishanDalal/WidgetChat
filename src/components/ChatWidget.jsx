// src/ChatWidget.jsx (React)
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { TextField, Button, List, ListItem, ListItemText } from "@mui/material";

function ChatWidget({ token }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    console.log("Attempting to connect to Socket.IO server...");
    socketRef.current = io("http://localhost:5000", { query: { token } });

    socketRef.current.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [token]);

  const sendMessage = () => {
    console.log("Sending message:", newMessage);
    socketRef.current.emit("sendMessage", newMessage);
    setNewMessage("");
  };

  return (
    <div>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${message.username}: ${message.text}`} />
          </ListItem>
        ))}
      </List>
      <TextField
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        label="Message"
      />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
}

export default ChatWidget;
