import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!!"],
    minLength: [3, "Name must contain 3 characters!!"],
    maxLength: [30, "Name can't exceed 30 characters!!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!!"],
    unique: [true, "Email already exist!!"],
    validate: [validator.isEmail, "Please provide valid email!!"],
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    required: [true, "Please provide your password!!"],
    minLength: [3, "Password must contain 3 characters!!"],
    maxLength: [32, "Password can't exceed 32 characters!!"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

import jwt from "jsonwebtoken";

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
