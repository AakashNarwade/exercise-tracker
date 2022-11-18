const User = require("../models/userModel");

//login
const loginUser = async (req, res) => {
  res.json({ msg: " Login success" });
};

//signup
const signupUser = async (req, res) => {
  res.json({ msg: " Signup success" });
};

module.exports = {
  loginUser,
  signupUser,
};
