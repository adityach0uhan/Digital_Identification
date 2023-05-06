const UserData = require("../models/user.model");
const nodemailer = require("nodemailer");

// Send Mail Function
async function sendM(UserEmailId, Username) {
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
}

// Delete User
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const del = await UserData.deleteOne({ enrollmentNum: id })
      .then(() => {
        res.redirect("/user/getAllUserInfo");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

// Show All User
const showAllUser = async (req, res) => {
  const mydata1 = await UserData.find({})
    .then((x) => {
      res.render("../views/allUserDetail.ejs", { x, UserData });
    })
    .catch((y) => {
      console.log(" error fetching data");
    });
};

// User Register
const userRegister = async (req, res) => {
  console.log(req.body);
  const { Username, branch, rollNum, gender, enrollmentNum, Address, email } =
    req.body;

  await UserData.create({
    Username,
    branch,
    rollNum,
    gender,
    enrollmentNum,
    Address,
    email,
  })
    .then(() => {
      res.render("QrPage.ejs", {
        Username,
        branch,
        rollNum,
        gender,
        enrollmentNum,
        Address,
        email,
      });
      sendM(email, Username);
    })
    .catch((e) => {
      res.render("alreadyExists.ejs",{email,rollNum})
    });
};

// User Search By Enrollment Number
const userSearch = async (req, res) => {
  const searchData = req.params.enrollmentNum;
  await UserData.find({ enrollmentNum: searchData })
    .then((x) => {
      res.render("../views/UserDataView.ejs", { x });
    })
    .catch((y) => {
      console.log(" error fetching data");
    });
};

// Load User Register Page
const loadUserRegisterPage = async (req, res) => {
  res.render("register.ejs");
};

module.exports = {
  userRegister,
  deleteUser,
  showAllUser,
  userSearch,
  loadUserRegisterPage,
};
