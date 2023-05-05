require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
app.set("view engine", "ejs");
const viewsFolder = path.join(path.resolve(), "views");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");

const UserData = require("../models/user.model");

const {
  deleteUser,
  showAllUser,
  userRegister,
  userSearch,
  loadUserRegisterPage,
} = require("../controller/user.controller");

//schema created

router.get("/", (req, res) => {
  res.send("<h1>Main Page</h1>");
});

router.get("/register", loadUserRegisterPage);

router.post("/register", userRegister);

router.get("/getAllUserInfo", showAllUser);

router.get("/deleteUser/:id", deleteUser);

router.get("/info/:enrollmentNum", userSearch);

module.exports = router;
