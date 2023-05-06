require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const { Userrouter, UserData } = require("./user.route.js");
const adminData = require("../models/admin.model.js");
app.set("view engine", "ejs");
const viewsFolder = path.join(path.resolve(), "views");
app.use(express.urlencoded({ extended: false }));
const { verifyLogin, loginPage } = require("../controller/admin.controller.js");

const router = express.Router();

router.get("/", loginPage);
router.post("/", verifyLogin);
// adminRouter.get("/deleteUser/:id",deleteUser);

// adminRouter.route("/FailedVerification")

module.exports = router;
