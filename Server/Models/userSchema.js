import mongoose from "mongoose";
import validator from "validator";

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

export const User = mongoose.model("User", userSchema);
