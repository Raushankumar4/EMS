const mongoose = require("mongoose");

const DB_NAME = "PRACTISE_DATABASE";

const dbConnect = async () => {
  try {
    const instance = await mongoose.connect(process.env.DB_URI);
    console.log(`DB Connect ${instance.connection.host}:${DB_NAME}`);
  } catch (error) {
    console.log(`Error while Db Connection ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
