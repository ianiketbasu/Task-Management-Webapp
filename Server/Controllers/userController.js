import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/error.js";
import { User } from "../Models/userSchema.js";
import cloudinary from "cloudinary";
import { sendToken } from "../Utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar required!!", 400));
  }
  const { avatar } = req.files;
  const allowedFormats = ["image/png", "image/jpg", "image/webp", "image/avif"];

  if (!allowedFormats.includes(avatar.mimetype)) {
    return next(
      new ErrorHandler("Required avatar format : jpg,png,webp or avif!!", 400)
    );
  }

  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return next(new ErrorHandler("Please fill full form!!", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists!!", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath
  );

  if (!cloudinaryResponse || cloudinary.error) {
    console.error(
      "Cloudinary Error: ",
      cloudinaryResponse.error || "Unknown cloudinary error!!"
    );
  }

  user = await User.create({
    name,
    email,
    phone,
    password,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  sendToken("User Registered Successfully!!", user, res, 200);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email or password!!", 400));
  }

  const user = await User.findOne({ email }).select("password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password!!", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password!!", 400));
  }

  sendToken("User logged in successfully!!", user, res, 200);
});
export const logout = catchAsyncError((req, res, next) => {});
export const profile = catchAsyncError((req, res, next) => {});
