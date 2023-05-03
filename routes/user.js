require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path")
const Userrouter = express.Router();
const mongoose = require("mongoose");
app.set("view engine", "ejs");
const viewsFolder = path.join(path.resolve(), "views")
const nodemailer = require("nodemailer")
const QRCode = require('qrcode');

//schema created
const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        uppercase: true
    },
    branch: {
        type: String,
        uppercase: true
    },
    rollNum: {
        type: String,
        uppercase: true
    },
    gender: {
        type: String,
        uppercase: true
    },
    enrollmentNum: {
        type: String,
        uppercase: true
    },
    Address: {
        type: String,
        uppercase: true
    },
    email: {
        type: String,
        lowercase: true
    },
});

const UserData = mongoose.model("StudentData2", UserSchema)

const ConnectionString = process.env.MONGODB_URI
const DbName = "Student_ID_project"

mongoose.connect(ConnectionString, { dbName: DbName })
    .then(c => { console.log("User database  is connected") })
    .catch(c => { console.log("User database is not connected") })

Userrouter.get("/", (req, res) => {
    res.send(" user main page")
})

Userrouter.get("/register", (req, res) => {
    res.render("register.ejs");
})

Userrouter.post("/register", async (req, res) => {
    const { Username, branch, rollNum, gender, enrollmentNum, Address, email } = req.body;
    await UserData.create({ Username, branch, rollNum, gender, enrollmentNum, Address, email })
        .then(() => {
            res.render("QrPage.ejs", { Username, branch, rollNum, gender, enrollmentNum, Address, email });
            
            const UserEmailId = email;
            async function sendM(UserEmailId) {
                try {
                    const transporter = nodemailer.createTransport({
                        host: "smtp.office365.com",
                        port: "587",
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: "motivational-quotes1@outlook.com",
                            pass: "Aditya@123",
                        },
                    });

                    const mailOptions = {
                        from: `Digital Identification <motivational-quotes1@outlook.com>`,
                        to: UserEmailId,
                        subject: "Registration Complete!",
                        html: `
              Dear ${Username} ,
              <br><br>
              successfully registered to our Digital Student Identification website 
              <br>
              we have provided you a QR code which you can use to Identify yourself 
              <br>
              <br>
              
              <br>From Digital Identification website by Aditya  <br>
              
              `,
                    };
                    transporter.sendMail(mailOptions, function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(`Email Has been Sent`);
                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            };

            sendM(UserEmailId);


        }).catch((e) => {
            console.log(e)
        })
})




const showAllUser = async (req, res) => {
    const mydata1 = await UserData.find({}).then((x) => {
        
        res.render("../views/allUserDetail.ejs", { x,UserData })
    }).catch((y) => {
        console.log(" error fetching data")
    })
}
Userrouter.get("/getAllUserInfo",showAllUser);


const deleteUser= async (req,res)=>{
    try{
        const id=req.params.id
        const del = await UserData.deleteOne({enrollmentNum:id}).then(()=>{
            res.redirect("/user/getAllUserInfo")
        }).catch((err)=>{
            console.log(err)
        })
    }catch(err){
        console.log(err)
    }
}
Userrouter.get("/deleteUser/:id",deleteUser);


Userrouter.get("/info/:enrollmentNum", async (req, res) => {
    const searchData = req.params.enrollmentNum
    const mydata = await UserData.find({ enrollmentNum: searchData }).then((x) => {
        res.render("../views/UserDataView.ejs", { x })
    }).catch((y) => {
        console.log(" error fetching data")
    })
})


module.exports = Userrouter,UserData;


