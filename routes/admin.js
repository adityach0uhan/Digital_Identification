require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const adminRouter = express.Router();
const adminLogin = require("../controller/admin.js")
const {Userrouter,UserData} = require("./user.js")
const adminData = require("../models/admin.js");
const { url } = require("inspector");
app.set("view engine", "ejs");
const viewsFolder = path.join(path.resolve(), "views")
app.use(express.urlencoded({ extended: false }))

const loginPage = async (req, res) => {
    res.render("../views/adminLogin.ejs")
}

const verifyLogin = async (req, res,next) => {
    const adminIdInput = req.body.adminId
    const adminPassword = req.body.adminPassword
    const admin_ID = await adminData.find({})
    admin_ID.forEach((x) => {
        try {
            if (adminIdInput === x.adminId && adminPassword === x.adminPassword) {
                res.redirect("/user/getAllUserInfo")
            }
            else {
                res.render("../views/rejectAdmin.ejs")
            }
        }
        catch {
            res.render("../views/rejectAdmin.ejs")

        }

    })
}

adminRouter.route("/").get(loginPage);
adminRouter.route("/").post(verifyLogin);
// adminRouter.get("/deleteUser/:id",deleteUser);






// adminRouter.route("/FailedVerification")

module.exports = adminRouter;
