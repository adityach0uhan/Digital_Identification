require("dotenv").config();
const adminData = require("../models/admin.model.js");
// Load Admin Page
const loginPage = async (req, res) => {
  res.render("../views/adminLogin.ejs");
};

// Verify Admin Login
const verifyLogin = async (req, res) => {
  const { adminId, adminPassword } = req.body;

  try {
    const adminCheck = await adminData.findOne({
      adminId: adminId,
      adminPassword: adminPassword,
    });

    if (
      adminCheck.adminId === adminId &&
      adminCheck.adminPassword === adminPassword
    ) {
      res.redirect("/user/getAllUserInfo");
    } else {
      res.render("../views/rejectAdmin.ejs");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { verifyLogin, loginPage };
