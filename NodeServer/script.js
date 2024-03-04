//Node Server that will handle socket io connections
const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
server.listen(8000);
const users = {};

//socket.io instance, will listen to connections
io.on("connection", (socket) => {
  //particular connection
  //if any new user joins, let other users connected to the server know
  socket.on("new-user-joined", (username) => {
    users[socket.id] = username;
    socket.broadcast.emit("user-joined", username);
  });

  //if someone sends a message, broadcast to other people
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      username: users[socket.id],
    });
  });

  //if someone leaves the chat, let others know
  socket.on("disconnect", (message) => {
    //built-in event
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
