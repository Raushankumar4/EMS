const dotenv = require("dotenv");
const app = require("./app.js");
const dataBase = require("./db/db.js");
const http = require("http");

dotenv.config();

const server = http.createServer(app);

const initializeSocket = require("./Socket/socket.js");
initializeSocket(server);

dataBase()
  .then(() => {
    server.listen(5000, () => {
      console.log("Listening on 5000");
    });
  })
  .catch((err) => {
    console.log(`Error While Connection ${err.message}`);
  });
