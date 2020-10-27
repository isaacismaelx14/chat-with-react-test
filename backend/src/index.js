const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  socket.on("connected", () => {
    console.log("user connected");
  });
});

server.listen(4000, () => console.log("server on port 4000"));
