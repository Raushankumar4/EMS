import React, { useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useMemo(() => io("http://localhost:5000"), []);
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [userID, setUserID] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [roomName, setRoomName] = React.useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setUserID(socket.id);
      console.log(`Connected: ${socket.id}`);
    });

    socket.on("message", (data) => {
      console.log("Kuch oh hai", data);
    });
    socket.on("receive-message", (data) => {
      console.log("Received", data);
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handle = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("")
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Chat - {userID}
        </h1>

        <form onSubmit={handleJoinRoom} className="mb-6">
          <h2 className="text-lg font-medium mb-2">Room Name</h2>
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Enter Room Name"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Join Room
          </button>
        </form>

        <form onSubmit={handle} className="mb-6">
          <div className="mb-4">
            <label htmlFor="room" className="block text-sm font-medium mb-2">
              Room
            </label>
            <input
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Room"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {messages.map((message, index) => (
            <p key={index} className="p-2 bg-gray-200 rounded-md">
              {message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
