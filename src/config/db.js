const mongoose = require("mongoose");
require("dotenv").config();

const connection = process.env.MONGODB_URL;

console.log("port:",process.env.PORT);
console.log("connection:",connection);

mongoose
  .connect(connection, { useNewUrlParser: true })
  .then((data) => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = mongoose;
