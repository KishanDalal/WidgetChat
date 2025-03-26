// src/components/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("error", (error) => {
  console.error("Socket.IO server error:", error);
});

io.on("connection", (socket) => {
  console.log("io.on connection called");
  console.log("Client connected");
  const token = socket.handshake.query.token;
  console.log(`Client connected with token: ${token}`);

  socket.on("sendMessage", (message) => {
    try {
      console.log("socket on sendMessage called");
      console.log("Message received:", message);
      //basic username, replace with user data from the token or other source.
      const username = "User";
      io.emit("message", { username: username, text: message }); // Broadcast to all clients
      console.log("socket on sendMessage finished");
    } catch (error) {
      console.error("Error handling sendMessage:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("socket on disconnect called");
    console.log("Client disconnected");
  });
});

server.listen(5002, () => {
  console.log("Server running on port 5002");
});
