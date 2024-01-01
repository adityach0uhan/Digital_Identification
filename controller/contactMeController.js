require("dotenv").config();
// const { config } = require("dotenv");
const UserData = require("../models/user.model");
const nodemailer = require("nodemailer");


const contactMePageRender =async (req,res)=>{

    res.render("../views/contactMe.ejs");

}



const contactMeMailReceive=async (req,res)=>{
    const {name,email,subject,message} = req.body;


// Send Mail Function
async function sendComplaint() {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: "587",
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.SMTP_User,
          pass: process.env.SMTP_Pass,
        },
      });
  
      const mailOptions = {
        from: `Digital Identification <motivational-quotes1@outlook.com>`,
        to: "gyaniguru137@gmail.com",
        subject: "Registration Complete!",
        html: `
            Dear Admin ,
            <br><br>
            Someone with the Name : ${name} and EmailId: ${email} 
            <br>
            has send you a message related to ${subject}
            <br>
            <br>
            <br>The Message says ${message}  <br>
            `,
      };
      transporter.sendMail(mailOptions, function (error) {
        if (error) {
          console.log(error);
        } else {
          res.render("../views/ContactMeSuccess.ejs",{name});
          console.log(`Email Has been Sent`);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  sendComplaint()


   
     
}


 module.exports= {contactMePageRender,contactMeMailReceive};
