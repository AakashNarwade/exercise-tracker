const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//! static method on User model to check signup
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const userExists = await this.findOne({ email });
  if (userExists) {
    throw new Error("User already exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hashedPassword });

  return user;
};

//! static method on User model to check login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const userEmailExists = await this.findOne({ email });
  if (!userEmailExists) {
    throw new Error("Email Is Incorrect");
  }

  const match = await bcrypt.compare(password, userEmailExists.password);
  if (!match) {
    throw new Error("Password Is Incorrect");
  }
  return userEmailExists;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
