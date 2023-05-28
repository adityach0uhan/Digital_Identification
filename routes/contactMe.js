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

router.get("/ContactMe",(req,res)=>{
    res.send(" contact me page")
});


module.exports = {router};
