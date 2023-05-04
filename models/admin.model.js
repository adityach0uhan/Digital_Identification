require("dotenv").config();
const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  adminId: {
    type: String,
  },
  adminPassword: {
    type: String,
  },
});

module.exports = mongoose.model("AdminInfo", adminSchema);
