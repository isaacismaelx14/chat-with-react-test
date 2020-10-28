const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  socket.on("connected", (name) => {
    io.emit("connectedUser", {
      server: "server",
      message: `${name} is connected`,
    });
  });

  socket.on("message", (name, message) => {
    io.emit("messages", { name, message });
  });

  socket.on("disconnected", (name) => {
    io.emit("messages", {
      server: "server",
      message: `${name} has left the chat`,
    });
  });
});

server.listen(4000, () => console.log("server on port 4000"));
