//Node Server that will handle socket io connections
const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
server.listen(8000);
const users = {};

io.on("connection", (socket) => {
  //socket.io instance, will listen to connections
  socket.on("new-user-joined", (username) => {
    //particular connection
    console.log("New user", username);
    users[socket.id] = username;
    socket.broadcast.emit("user-joined", username);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      username: users[socket.id],
    });
  });
});
