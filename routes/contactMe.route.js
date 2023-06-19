require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
app.set("view engine", "ejs");
const viewsFolder = path.join(path.resolve(), "views");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
const { contactMePageRender ,contactMeMailReceive } = require("../controller/contactMeController.js");

app.use(express.urlencoded({ extended: false }));

const router = express.Router();
router.get("/", contactMePageRender);

router.post("/", contactMeMailReceive)
// router.post("/",(req,res)=>{
//   console.log(req.body)
// })

module.exports = router;
