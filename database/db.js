const { config } = require("dotenv");
const mongoose = require("mongoose");

const dbConnect = () => {
  const ConnectionString = process.env.MONGODB_URI;
  const DbName = "Student_ID_project";

  mongoose
    .connect(ConnectionString, { dbName: DbName })
    .then((c) => {
      console.log("Database  is Connected ⚡ ");
    })
    .catch((c) => {
      console.log(c);
      console.log("Database is not Connected 🥹");
    });
};

module.exports = dbConnect;
