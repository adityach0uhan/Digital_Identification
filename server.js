require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
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
// const { config } = require("dotenv");
app.use("/admin", adminRouter);


const contactPageRouter = require("./routes/contactMe.route");
app.use('/ContactMe', contactPageRouter);


// server port
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}` );
});
