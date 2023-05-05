const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = require("./database/db");
dbConnect();

app.set("view engine", "ejs");
const viewsFolder = path.join(path.resolve(), "views");

app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// home route
app.get("/", (req, res) => {
  res.render("home.ejs");
});

// including user route
const Userrouter = require("./routes/user.route");
app.use("/user", Userrouter);

// admin route
const adminRouter = require("./routes/admin.route");
app.use("/admin", adminRouter);

// server port
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
