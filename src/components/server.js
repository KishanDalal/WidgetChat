// src/components/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } }); // Changed port to 5000

io.on("connection", (socket) => {
  console.log("Client connected"); // Keep this log for debugging

  // ... rest of your server code ...
});

server.listen(5000, () => {
  // Changed port to 5000
  console.log("Server running on port 5000");
});
