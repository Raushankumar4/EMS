const { Server } = require("socket.io");

module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`User Disconnected ${socket.id}`);
    });

    socket.on("message", ({ room, message }) => {
      console.log({ room, message });
      io.to(room).emit("receive-message", message);
    });

    socket.on("join-room", (room) => {
      console.log("Joined Room", room);
      socket.join(room);
    });
  });
};
