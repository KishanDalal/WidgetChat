// src/ChatWidget.jsx (React)
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { TextField, Button, List, ListItem, ListItemText } from "@mui/material";

function ChatWidget({ token }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    if (token) {
      // Only connect if token is available
      console.log("Attempting to connect to Socket.IO server...");
      socketRef.current = io("http://localhost:5002", { query: { token } });

      socketRef.current.on("connect", () => {
        console.log("Socket.IO connected successfully.");
      });

      socketRef.current.on("connect_error", (err) => {
        console.error("Socket.IO connection error:", err);
      });

      socketRef.current.on("message", (message) => {
        console.log("message recieved: ", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          console.log("Socket disconnected");
        }
      };
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [token]);

  const sendMessage = () => {
    console.log("Sending message:", newMessage);
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", newMessage);
    } else {
      console.log("Socket not connected");
    }

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
