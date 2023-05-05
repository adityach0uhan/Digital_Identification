const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    uppercase: true,
  },
  branch: {
    type: String,
    uppercase: true,
  },
  rollNum: {
    type: String,
    uppercase: true,
    unique: true,
  },
  gender: {
    type: String,
    uppercase: true,
  },
  enrollmentNum: {
    type: String,
    uppercase: true,
    unique: true,
  },
  Address: {
    type: String,
    uppercase: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
});

const UserData = mongoose.model("StudentData2", UserSchema);

module.exports = UserData;
