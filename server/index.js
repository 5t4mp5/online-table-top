const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const socketio = require("socket.io");
const uuidV4 = require("uuid/v4");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.json());

app.use("/api/game-state", require("./routes/gameState"));

app.get("/app.js", (req, res, next) =>
  res.sendFile(path.join(__dirname, "..", "dist", "main.js"))
);

app.get("/", (req, res, next) => {
  if (!req.session.userId) {
    console.log("NO SESSION");
    req.session.userId = uuidV4();
  } else {
    console.log("SESSION EXISTS: ", req.session.userId);
  }
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

const server = app.listen(port, () => console.log(`listening on port ${port}`));

const io = socketio(server);

io.on("connect", socket => {
  socket.on("stateUpdate", update => {
    console.log("SERVER RECEIVED STATE UPDATE", update);
    socket.broadcast.emit("stateUpdate", update);
  });
  
  socket.on('playerJoined', player => {
    console.log("PLAYER JOINED", player);
    socket.emit("playerJoined", player);
    socket.broadcast.emit("playerJoined", player);
  });
});
