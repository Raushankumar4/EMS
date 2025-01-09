const dotenv = require("dotenv");
const app = require("./app.js");
const dataBase = require("./db/db.js");

dotenv.config();

dataBase()
  .then(() => {
    app.listen(5000, (req, res) => {
      console.log("listening on 50000");
    });
  })
  .catch((err) => {
    console.log(`Error While Connection ${err.message}`);
  });
